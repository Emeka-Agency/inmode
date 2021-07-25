<?php
    namespace InmodeBack\Model;

    // DONE ajouter colonne actif
    // DONE ajouter colonne validé
    // DONE ajouter colonne bloqué

    class UserManager extends Manager
    {
        // DB CREATION
        static $table_name = 'users';
        static $table_schema = [
            "id" => "INT NOT NULL PRIMARY KEY AUTO_INCREMENT",
            "account" => "VARCHAR(16) DEFAULT 'user'",
            "mail" => "VARCHAR(64) NOT NULL",
            "pseudo" => "VARCHAR(64) DEFAULT NULL",
            "password" => "VARCHAR(64) NOT NULL",
            "inscription" => "DATETIME DEFAULT CURRENT_TIMESTAMP",
            "actif" => "BOOLEAN DEFAULT true",
            "valide" => "BOOLEAN DEFAULT false",
            "bloque" => "BOOLEAN DEFAULT false",
            "roles" => "VARCHAR(128) DEFAULT '[\"".self::VISITOR."\"]'",
            "CONSTRAINT UniqueMail" => "UNIQUE(mail)"
        ];
        static $db_locale = "DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
        private $db_created = false;

        private $is_loged;

        private $user_id;
        private $role_utilisateur;
        private $user_mail;
        private $pseudo_utilisateur;
        private $account_creation;
        private $bloque;
        private $valide;
        private $actif;

        /**
         * Short - __construct
         *
         * Detailed - 
         *
         * @param bool $loged Is user loged or not
         *
         * @return bool
         */
        public function __construct($loged = false)
        {
            // DONE create users table //
            if(!tableExists(self::$table_name))
            {
                $this->db_created = createTable(self::$table_name, buildSchema(self::$table_schema)) || false;
            }
            else
            {
                $this->db_created = true;
            }

            $this->setLoged($loged);
            if($this->estConnecte())
            {
                $this->initLogedValues();
            }
            else {
                $this->setLoged(false);
                $this->setUserRole(self::VISITOR);
            }
            return true;
        }

        //// Basics  ////

        /**
         * Short - 
         * 
         * Detailed - 
         */
        private function initLogedValues()
        {
            $values = json_decode(getSession('user_datas'));
            if($this->mailExists($values->mail))
            {
                $this->setUserId($values->id);
                logEvent("setUserId(".$values->id.")");
                $this->setAccountCreation($values->inscription);
                logEvent("setAccountCreation(".$values->inscription.")");
                $this->setUserPseudo($values->pseudo);
                logEvent("setUserPseudo(".$values->pseudo.")");
                $this->setUserRole($values->account);
                logEvent("setUserRole(".$values->account.")");
                $this->setUserMail($values->mail);
                logEvent("setUserMail(".$values->mail.")");
                $this->setUserBloque($values->bloque);
                logEvent("setUserBloque(".$values->bloque.")");
                $this->setUserValide($values->valide);
                logEvent("setUserValide(".$values->valide.")");
                $this->setUserActif($values->actif);
                logEvent("setUserActif(".$values->actif.")");
            }
            else
            {
                $this->setLoged(false);
                $this->setUserRole(self::VISITOR);
            }
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @param boolean $connect 
         * @param string $login Identifiant de connexion
         * @param string $password Mot de passe de connexion
         * @param string $method Méthode de hashage
         * @param string $redirect URL de redirection en cas de succès
         * 
         * @return array
         */
        private function login($connect, $login, $password, $method, $redirect = '')
        {
            if($this->estConnecte())
            {
                return [
                    "status" => "error",
                    "message" => "Is already loged"
                ];
            }
            if(!isBoolean($connect) || !isString($login) || !isString($password))
            {
                return [
                    "status" => "error",
                    "message" => "Invalid parameters",
                    "parameters" => [
                        "_connect" => json_encode($connect),
                        "connect" => ["needed" => "boolean", "actual" => gettype($connect)],
                        "login" => ["needed" => "string", "actual" => gettype($login)],
                        "password" => ["needed" => "string", "actual" => gettype($password)],
                    ]
                ];
            }
            else
            {
                // $result = dbRequest("SELECT id, account, pseudo, inscription, roles, bloque, valide, actif FROM users WHERE mail=".pdoSanitizeInput(encrypt($login, $method))." AND password=".pdoSanitizeInput(encrypt($password, $method)));
                $result = dbRequest("SELECT id, account, mail, pseudo, inscription, roles, bloque, valide, actif FROM users WHERE (mail=".pdoSanitizeInput($login)." OR pseudo=".pdoSanitizeInput($login).") AND password=".pdoSanitizeInput(encrypt($password, $method)));
                if(isset($result[0]))
                {
                    setSession('user_loged', true);
                    setSession('user_datas', json_encode([
                        "account" => $result[0]['account'],
                        "pseudo" => $result[0]['pseudo'],
                        "inscription" => $result[0]['inscription'],
                        "mail" => $result[0]['mail'],
                        "id" => $result[0]['id'],
                        "bloque" => $result[0]['bloque'],
                        "valide" => $result[0]['valide'],
                        "actif" => $result[0]['actif'],
                    ]));
                    $this->setLoged(true);
                    return [
                        "status" => "success",
                        "user" => [
                            "account" => $result[0]['account'],
                            "pseudo" => $result[0]['pseudo'],
                            "inscription" => $result[0]['inscription'],
                            "isAdmin" => $this->roleEstAdmin($result[0]['account']),
                            "roles" => $result[0]['roles'],
                            "bloque" => $result[0]['bloque'],
                            "valide" => $result[0]['valide'],
                            "actif" => $result[0]['actif'],
                        ],
                        "redirect" => $GLOBALS['app']->avoirURLBase()."/".(str_replace($GLOBALS['app']->avoirURLBase()."/", "", $redirect))
                    ];
                }
                else
                {
                    return [
                        "status" => "error",
                        "message" => "No such user with given parameters",
                        "user" => null,
                    ];
                }
            }
        }


        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @param boolean
         * @param string
         * @param string|null
         * 
         * @return array
         */
        public function adminLogin($connect = true, $login, $pass, $redirect = null)
        {
            return $this->login($connect, $login, $pass, $_ENV['algo_decoupage_admin_connexion'], (isNull($redirect) ? $_ENV['particule_admin_secret'] : $redirect) );
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @param bool $connect
         * @param string $login
         * @param string $pass
         * @param string $redirect
         * 
         * @return array
         */
        public function userLogin($connect = true, $login, $pass, $redirect = "")
        {
            logEvent("Try to log as user");
            $result = $this->login($connect, $login, $pass, $_ENV['algo_decoupage_connexion_utilisateur'], $redirect);
            if($result['status'] == 'error')
            {
                logEvent("Try to log as admin");
                $admin_try = $this->adminLogin($connect, $login, $pass, $redirect);
                if($admin_try['status'] == 'success')
                {
                    return $admin_try;
                }
            }
            return $result;
        }
        
        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @return string User highest role
         */
        public function highestRole()
        {
            return $this->estConnecte() ? "" : self::VISITOR;
        }

        /**
         * Short - 
         * 
         * @param string|null $route Null or given url
         * 
         * Detailed - 
         */
        public function logout($route = null)
        {
            setSession('user_loged', false);
            setSession('user_datas', json_encode([]));
            header("Location: ".($route == null ? $GLOBALS['app']->avoirURLBase() : $route));
        }

        /**
         * Short - Set the log status
         * 
         * Detailed - 
         * 
         * @param boolean $bool
         */
        private function setLoged($bool)
        {
            $this->is_loged = $bool;
        }

        /**
         * Short - Is loged
         *
         * Detailed - 
         *
         * @return bool
         */
        public function estConnecte()
        {
            return $this->is_loged;
        }

        /**
         * Short - Is premium
         *
         * Detailed - 
         *
         * @return bool
         */
        public function estPremium()
        {
            if(!$this->estConnecte()) {return false;}
            return objectKeyIndex($this->role_utilisateur, self::USER_TYPES) >= objectKeyIndex(self::PREMIUM, self::USER_TYPES);
        }

        /**
         * Short - Is admin
         *
         * Detailed - 
         *
         * @return bool
         */
        public function estAdmin()
        {
            if(!$this->estConnecte()) {return false;}
            return objectKeyIndex($this->role_utilisateur, self::USER_TYPES) >= objectKeyIndex(self::ADMIN, self::USER_TYPES);
        }

        /**
         * Short - Role is admin
         *
         * Detailed - 
         *
         * @param string $role Description
         *
         * @return bool
         */
        public function roleEstAdmin($role)
        {
            if(!$this->estConnecte()) {return false;}
            return objectKeyIndex($role, self::USER_TYPES) >= objectKeyIndex(self::ADMIN, self::USER_TYPES);
        }

        //// Data ////

        /**
         * 
         * Short - 
         * 
         * Detailed - 
         * 
         * @param string $param
         * 
         * @return mixed
         */
        function avoirParam($param) {
            if(gettype($param) != "string") {return false;}
            switch($param) {
                case "id": return $this->getUserId();
                case "role": return $this->getUserAccount();
                case "mail": return $this->getUserMail();
                case "pseudo": return $this->getUserPseudo();
                case "inscription": return $this->getUserAccountCreation();
                case "actif": return $this->getUserActif();
                case "valide": return $this->getUserValide();
                case "bloque": return $this->getUserBloque();
                // case "roles": return $this->getUserRoles();
                case "highest-role": return $this->highestRole();
                default: return false;
            }
        }

        /**
         * Short - Get user role
         *
         * Detailed - 
         * 
         * @param string|null $name User name or null if current user
         *
         * @return string
         */
        public function getUserId($name = null)
        {
            if($name == null) {
                return $this->user_id;
            }
        }

        /**
         * Short - Get user account
         *
         * Detailed - 
         * 
         * @param string|null $name User name or null if current user
         *
         * @return string
         */
        public function getUserAccount($name = null)
        {
            if($name == null) {
                return $this->role_utilisateur;
            }
        }

        /**
         * Short - Get user role
         *
         * Detailed - 
         * 
         * @param string|null $name User name or null if current user
         *
         * @return string
         */
        public function getUserMail($name = null)
        {
            if($name == null) {
                return $this->user_mail;
            }
        }

        /**
         * Short - Get user role
         *
         * Detailed - 
         * 
         * @param string|null $name User name or null if current user
         *
         * @return string
         */
        public function getUserRole($name = null)
        {
            if($name == null) {
                return $this->role_utilisateur;
            }
        }

        /**
         * Short - Get user pseudo
         *
         * Detailed - 
         * 
         * @param string|null $name User name or null if current user
         *
         * @return string
         */
        public function getUserPseudo($name = null)
        {
            if($name == null) {
                return $this->pseudo_utilisateur;
            }
        }

        /**
         * Short - Get account creation
         *
         * Detailed - 
         * 
         * @param string|null $name User name or null if current user
         *
         * @return string
         */
        public function getUserAccountCreation($name = null)
        {
            if($name == null) {
                return $this->account_creation;
            }
        }

        /**
         * Short - Get user active status
         *
         * Detailed - 
         * 
         * @param string|null $name User name or null if current user
         *
         * @return string
         */
        public function getUserActif($name = null)
        {
            if($name == null) {
                return $this->actif;
            }
        }

        /**
         * Short - Get user valid status
         *
         * Detailed - 
         * 
         * @param string|null $name User name or null if current user
         *
         * @return string
         */
        public function getUserValide($name = null)
        {
            if($name == null) {
                return $this->valide;
            }
        }

        /**
         * Short - Get user blocked status
         *
         * Detailed - 
         * 
         * @param string|null $name User name or null if current user
         *
         * @return string
         */
        public function getUserBloque($name = null)
        {
            if($name == null) {
                return $this->bloque;
            }
        }

        /**
         * Short - Get data
         *
         * Detailed - 
         * 
         * @param string|null $name User name or null if current user
         *
         * @return string
         */
        public function getData($name = null)
        {
            return "";
        }
    
        //// Settings ////
    
        /**
         * Short - Get settings
         *
         * Detailed - 
         * 
         * @param string|null $name User name or null if current user
         *
         * @return array
         */
        public function getSettings($name = null)
        {
            return [];
        }
    
        //// Comments ////
    
        /**
         * Short - Get comments
         *
         * Detailed - 
         *
         * @param string $name Description
         *
         * @return array
         */
        public function getComments($name = null)
        {
            return [];
        }
    
        /**
         * Short - Set data
         *
         * Detailed - 
         *
         * @param string $name Description
         *
         * @return bool
         */
        private function setData($name = null)
        {
            if($name == null) {
                return true;
            }
        }
    
        /**
         * Short - Set settings
         *
         * Detailed - 
         * 
         * @param string $value New value
         * @param string|null $name User name or null if current user
         *
         * @return bool
         */
        private function setSettings($value, $name = null)
        {
            if($name == null) {
                return true;
            }
        }
    
        /**
         * Short - Set comments
         *
         * Detailed - 
         *
         * @param string|null $name Description
         *
         * @return bool
         */
        private function setComments($name = null)
        {
            if($name == null) {
                return true;
            }
        }


        /**
         * Short - Set user role
         *
         * Detailed - 
         * 
         * @param string $value New value
         * @param string|null $name User name or null if current user
         *
         * @return bool
         */
        private function setUserRole($value, $name = null)
        {
            if($name == null) {
                $this->role_utilisateur = $value;
                return true;
            }
        }

        /**
         * Short - Set user pseudo
         *
         * Detailed - 
         * 
         * @param string $value New value
         * @param string|null $name User name or null if current user
         *
         * @return bool
         */
        private function setUserPseudo($value, $name = null)
        {
            if($name == null) {
                $this->pseudo_utilisateur = $value;
                return true;
            }
        }

        /**
         * Short - Set account creation
         *
         * Detailed - 
         * 
         * @param string $value New value
         * @param string|null $name User name or null if current user
         *
         * @return bool
         */
        private function setAccountCreation($value, $name = null)
        {
            if($name == null) {
                $this->account_creation = $value;
                return true;
            }
        }

        /**
         * Short -
         * 
         * Detailed - 
         * 
         * @param string $value New value
         * @param string|null $name User name or null if current user
         *
         * @return bool
         */
        private function setUserId($value, $name = null)
        {
            if($name == null) {
                $this->user_id = $value;
                return true;
            }
        }

        /**
         * Short -
         * 
         * Detailed - 
         * 
         * @param string $value New value
         * @param string|null $name User name or null if current user
         *
         * @return bool
         */
        private function setUserMail($value, $name = null)
        {
            if($name == null) {
                $this->user_mail = $value;
                return true;
            }
        }

        /**
         * Short -
         * 
         * Detailed - 
         * 
         * @param string $value New value
         * @param string|null $name User name or null if current user
         *
         * @return bool
         */
        private function setUserValide($value, $name = null)
        {
            if($name == null) {
                $this->valide = $value;
                return true;
            }
        }

        /**
         * Short -
         * 
         * Detailed - 
         * 
         * @param string $value New value
         * @param string|null $name User name or null if current user
         *
         * @return bool
         */
        private function setUserBloque($value, $name = null)
        {
            if($name == null) {
                $this->bloque = $value;
                return true;
            }
        }

        /**
         * Short -
         * 
         * Detailed - 
         * 
         * @param string $value New value
         * @param string|null $name User name or null if current user
         *
         * @return bool
         */
        private function setUserActif($value, $name = null)
        {
            if($name == null) {
                $this->actif = $value;
                return true;
            }
        }
    
        /**
         * Short - Delete comments
         *
         * Detailed - 
         *
         * @return bool
         */
        public function deleteComments()
        {
            return true;
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @param string $mail
         * 
         * @return boolean
         */
        private function mailExists($mail)
        {
            // return (
                // isset(dbRequest("SELECT id FROM users WHERE mail=".pdoSanitizeInput(encrypt($mail, $_ENV['algo_decoupage_connexion_utilisateur'])))[0])
                // ||
                // isset(dbRequest("SELECT id FROM users WHERE mail=".pdoSanitizeInput(encrypt($mail, $_ENV['algo_decoupage_admin_connexion'])))[0])
            // );
            return (isset(dbRequest("SELECT id FROM users WHERE mail=".pdoSanitizeInput($mail))[0]));
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @param string $pseudo
         * 
         * @return boolean
         */
        private function pseudoExists($pseudo)
        {
            return isset(dbRequest("SELECT id FROM users WHERE pseudo=".pdoSanitizeInput($pseudo))[0]);
        }

        /**
         * Short - Create user
         *
         * Detailed - 
         *
         * @param string $type
         * @param string $mail
         * @param string $pseudo
         * @param string $password
         * @param string $metho
         *
         * @return array
         */
        private function create($type = self::USER, $mail, $pseudo = null, $password, $method)
        {
            if(!isString($mail) || !isString($pseudo) || !isString($password))
            {
                return [
                    "status" => "error",
                    "message" => "Invalid parameters",
                    "parameters" => [
                        "mail" => ["needed" => "string", "actual" => gettype($mail)],
                        "pseudo" => ["needed" => "string", "actual" => gettype($pseudo)],
                        "password" => ["needed" => "string", "actual" => gettype($password)],
                    ]
                ];
            }
            if($this->mailExists($mail))
            {
                return [
                    "status" => "error",
                    "message" => "Mail already exists"
                ];
            }
            if($pseudo != "" && $this->pseudoExists($pseudo))
            {
                return [
                    "status" => "error",
                    "message" => "Pseudo already exists"
                ];
            }
            // $result = dbRequest("INSERT INTO `users`(`account`, `mail`, `pseudo`, `password`) VALUES (".pdoSanitizeInput($type).", ".pdoSanitizeInput(encrypt($mail, $method)).", ".pdoSanitizeInput($pseudo).", ".pdoSanitizeInput(encrypt($password, $method)).")");
            $result = dbRequest("INSERT INTO `users`(`account`, `mail`, `pseudo`, `password`) VALUES (".pdoSanitizeInput($type).", ".pdoSanitizeInput($mail).", ".pdoSanitizeInput($pseudo == null ? encrypt($mail.time()) : $pseudo).", ".pdoSanitizeInput(encrypt($password, $method)).")");
            if($result != $GLOBALS['DB_REQUEST_ERROR'])
            {
                $this->setLoged(true);
                return [
                    "status" => "success"
                ];
            }
            else
            {
                logEvent(print_r($result));
                return [
                    "status" => "problem",
                    "message" => "Can't create user with given parameters",
                    "user" => null,
                ];
            }
        }

        /**
         * Short - Allow admin to create user
         *
         * Detailed - 
         *
         * @param string $mail
         * @param string $password
         * @param string $pseudo
         *
         * @return array|bool
         */
        public function createUser($mail, $password, $pseudo = "")
        {
            if($this->peutCreerUtilisateur())
            {
                return $this->create(self::USER, $mail, $pseudo, $password, $_ENV['algo_decoupage_connexion_utilisateur']);
            }
            return false;
        }

        /**
         * Short - Allow admin to create user
         *
         * Detailed - 
         *
         * @param string $mail
         * @param string $password
         * @param string $pseudo
         * @param bool $force
         *
         * @return array|bool
         */
        public function createAdmin($mail, $password, $pseudo = "", $force = false)
        {
            if($force == true)
            {
                return $this->create(self::SUPERADMIN, $mail, $pseudo, $password, $_ENV['algo_decoupage_admin_connexion']);
            }
            if($this->peutCreerAdmin())
            {
                return $this->create(self::ADMIN, $mail, $pseudo, $password, $_ENV['algo_decoupage_admin_connexion']);
            }
            return false;
        }

        /**
         * Short - Create user from Woocommerce WebHook
         *
         * Detailed - 
         *
         * @param string $name
         * @param string $mail
         * @param string $password
         *
         * @return array
         */
         public function createFromWoocommerce($pseudo, $mail, $password)
        {
            return $this->create(self::USER, $mail, '', $password, $_ENV['algo_decoupage_connexion_utilisateur']);
        }
        

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @return integer|bool
         */
        public function avoirLimiteTel()
        {
            return self::USER_TYPES[$this->getUserRole()][self::DROIT_DOWNLOAD_LIMIT];
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @return bool
         */
        public function peutConnecterAdmin()
        {
            return self::USER_TYPES[$this->getUserRole()][self::DROIT_CONNECT_ADMIN];
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @return bool
         */
        public function peutSupprimerTout()
        {
            return self::USER_TYPES[$this->getUserRole()][self::DROIT_DELETE_ALL];
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @return bool
         */
        public function peutCreerUtilisateur()
        {
            return self::USER_TYPES[$this->getUserRole()][self::DROIT_CREATE_USER];
        }

        /**
         * Short - 
         * 
         * Detailed - 
         * 
         * @return bool
         */
        public function peutCreerAdmin()
        {
            return self::USER_TYPES[$this->getUserRole()][self::DROIT_CREATE_ADMIN];
        }

        const CONNECT_TOKEN = "azd64l68az4d684g(684zefazd648h-(:65z";

        /*
            -> download limit       -> number or true for unlimited
            -> can connect admin    -> true or false
            -> can upload build     -> true, false or 1 for verification needed
            -> can update build     -> true, false or 1 for verification needed
            -> can delete build     -> true or false
            -> can delete all       -> true or false
            -> can create user      -> true or false
            -> can create admin     -> true or false
        */

        const DROIT_DOWNLOAD_LIMIT = 0;
        const DROIT_CONNECT_ADMIN = 1;
        const DROIT_CREATE_BO = 2;
        const DROIT_UPLOAD_BO = 3;
        const DROIT_UPDATE_BO = 4;
        const DROIT_DELETE_BO = 5;
        const DROIT_DELETE_ALL = 6;
        const DROIT_CREATE_USER = 7;
        const DROIT_CREATE_ADMIN = 8;

        const VISITOR = "visitor";
        const USER = "user";
        const PREMIUM = "premium";
        const PROVIDER = "provider";
        const ADMIN = "admin";
        const SUPERADMIN = "superadmin";

        const ROLES = [
            self::VISITOR,
            self::USER,
            self::PREMIUM,
            self::PROVIDER,
            self::ADMIN,
            self::SUPERADMIN,
        ];

        const USER_TYPES = [
            //                     [download limit  ,connect admin  ,create bo  ,upload bo  ,update bo  ,delete bo  ,delete all ,create user    ,create admin   ]
            self::VISITOR       => [0               ,false          ,false      ,false      ,false      ,false      ,false      ,false          ,false          ],
            self::USER          => [1               ,false          ,false      ,false      ,false      ,false      ,false      ,false          ,false          ],
            self::PREMIUM       => [5               ,false          ,true       ,true       ,true       ,true       ,false      ,false          ,false          ],
            self::PROVIDER      => [0               ,true           ,true       ,true       ,true       ,false      ,false      ,false          ,false          ],
            self::ADMIN         => [true            ,true           ,true       ,true       ,true       ,true       ,false      ,true           ,false          ],
            self::SUPERADMIN    => [true            ,true           ,true       ,true       ,true       ,true       ,true       ,true           ,true           ],
        ];
    }