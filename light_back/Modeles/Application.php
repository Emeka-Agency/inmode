<?php

namespace App\Modeles;

class App
{
    // DB CREATION
    static $table_name = 'app_base';
    static $table_schema = [
        "app_version" => "VARCHAR(15) NOT NULL",
        "creation" => "DATETIME DEFAULT CURRENT_TIMESTAMP",
        "CONSTRAINT UniqueVersion" => "UNIQUE (app_version)"
    ]; // DONE change in a map (object) structure to easily get object->keys() and object->values() //
    static $db_locale = "DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
    private $db_created = false;

    // CLASS VALUES
    private $mode;
    private $version;

    private $admin_zone;

    /**
     * Short - __construct
     *
     * Detailed - 
     *
     * @param Type $name Description
     *
     * @return retour
     */
    public function __construct($use_mode = "")
    {
        date_default_timezone_set('UTC');
        $this->initMode($use_mode);
        $this->initEnv();

        // DONE create app table //
        if(!tableExists(self::$table_name))
        {
            $this->db_created = createTable(self::$table_name, buildSchema(self::$table_schema)) || false;
        }
        else
        {
            $this->db_created = true;
        }
        // session_name():
        if(isset($_COOKIE['token_session']))
        {
            session_name($_COOKIE['token_session']);
            session_start();
        }
        else
        {
            $token_session = encrypt(time(), $_ENV['algo_decoupage_jeton_session']);
            setcookie("token_session", $token_session, (time() + 24 * 3600 * 365));
            session_name($token_session);
            session_start();

            initLogs(time());
        }
        $this->changerAdminZone(false);
    }

    /**
     * Short - Secure the by passed foreign string parameter
     *
     * Detailed - 
     *
     * @param string $str Secured string
     *
     * @return str 
     */
    public function changerAdminZone($is_admin_zone)
    {
        return $this->admin_zone = gettype($is_admin_zone) == "boolean" ? $is_admin_zone : false;
    }

    /**
     * Short - Secure the by passed foreign string parameter
     *
     * Detailed - 
     *
     * @param string $str Secured string
     *
     * @return str 
     */
    public function estAdminZone()
    {
        return $this->admin_zone ? true : false;
    }

    /**
     * Short - Secure the by passed foreign string parameter
     *
     * Detailed - 
     *
     * @param string $str Secured string
     *
     * @return str 
     */
    private function securiserChaineExterne($str = "")
    {
        return htmlspecialchars(htmlentities($str));
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string Use mode of API
     */
    private function initMode($mode)
    {
        $this->mode = $mode == "prod" ? "PRODUCTION" : ("stage" ? "STAGING" : "DEVELOP");
        logEvent("Set app mode to ".$this->mode);
    }

    /**
     * Short - Initialize environment variables
     * 
     * Detailed - 
     */
    private function initEnv()
    {
        logEvent("Set environment variables");
        // $this->changerModeEnv();echo '<br/>"mode" : "'.$_ENV['mode'].'"';
        // $this->changerAdminURLSecretEnv();echo '<br/>"particule_admin_secret" : "'.$_ENV['particule_admin_secret'].'"';
        // $this->changerRacineEnv();echo '<br/>"db_host" : "'.$_ENV['db_host'].'"';
        // $this->changerNomBDDEnv();echo '<br/>"db_name" : "'.$_ENV['db_name'].'"';
        // $this->changerPortBDDEnv();echo '<br/>"db_port" : "'.$_ENV['db_port'].'"';
        // $this->changerPseudoBDDEnv();echo '<br/>"user_name" : "'.$_ENV['user_name'].'"';
        // $this->changerMdpBDDEnv();echo '<br/>"user_pass" : "'.$_ENV['user_pass'].'"';
        // putenv('algo_decoupage_admin_connexion=fnv1a64');
        // putenv('algo_decoupage_connexion_utilisateur=sha256');
        // putenv('algo_decoupage_jeton_session=sha512');
        // putenv('algo_decoupage_is_module=md5');
        // putenv('plugin_name_hash=fnv1a64');
    }

    /**
     * Short - 
     *
     * Detailed - 
     *
     * @param Type $name Description
     *
     * @return retour
     */
    public function avoirVersion()
    {
        return [
            'version' => $this->avoirIterationVersion(),
            'creation' => $this->avoirCreationVersion()
        ];
    }

    /**
     * Short - 
     *
     * Detailed - 
     *
     * @param Type $name Description
     *
     * @return retour
     */
    private function avoirCreationVersion()
    {
        
    }

    /**
     * Short - 
     *
     * Detailed - 
     *
     * @param Type $name Description
     *
     * @return retour
     */
    private function avoirIterationVersion()
    {
        
    }

    /**
     * Short - Get mode env vars
     *
     * Detailed - 
     *
     * @param Type $name Description
     *
     * @return retour
     */
    private function avoirEnvVarsMode()
    {
        switch($this->mode)
        {
            case "DEVELOP":
                return self::DEVELOP;
            case "PRODUCTION":
            default:
                return self::PRODUCTION;
        }
    }

    /**
     * Short - Set host
     *
     * Detailed - 
     *
     * @param Type $name Description
     *
     * @return retour
     */
    private function changerModeEnv()
    {
        // return $this->avoirEnvVarsMode()['HOST'];
        // putenv("mode=".$this->mode) || logError("Impossible to set mode environment variable");
        
    }

    /**
     * Short - Set host
     *
     * Detailed - 
     *
     * @param Type $name Description
     *
     * @return retour
     */
    private function changerAdminURLSecretEnv()
    {
        // return $this->avoirEnvVarsMode()['HOST'];
        // putenv("particule_admin_secret=".$this->avoirEnvVarsMode()['particule_admin_secret']) || logError("Impossible to set particule_admin_secret environment variable");
        
    }

    /**
     * Short - Set host
     *
     * Detailed - 
     *
     * @param Type $name Description
     *
     * @return retour
     */
    private function changerRacineEnv()
    {
        // return $this->avoirEnvVarsMode()['HOST'];
        // putenv("db_host=".$this->avoirEnvVarsMode()['DB_HOST']) || logError("Impossible to set db_host environment variable");
        
    }

    /**
     * Short - Set database name
     *
     * Detailed - 
     *
     * @param Type $name Description
     *
     * @return retour
     */
    private function changerNomBDDEnv()
    {
        // return $this->avoirEnvVarsMode()['DB_NAME'];
        // putenv("db_name=".$this->avoirEnvVarsMode()['DB_NAME']) || logError("Impossible to set db_name environment variable");
    }

    /**
     * Short - Set database port
     *
     * Detailed - 
     *
     * @param Type $name Description
     *
     * @return retour
     */
    private function changerPortBDDEnv()
    {
        // return $this->avoirEnvVarsMode()['DB_NAME'];
        // putenv("db_port=".$this->avoirEnvVarsMode()['DB_PORT']) || logError("Impossible to set db_port environment variable");
    }

    /**
     * Short - Set database user
     *
     * Detailed - 
     *
     * @param Type $name Description
     *
     * @return retour
     */
    private function changerPseudoBDDEnv()
    {
        // return $this->avoirEnvVarsMode()['USER_NAME'];
        // putenv("user_name=".$this->avoirEnvVarsMode()['USER_NAME']) || logError("Impossible to set user_name environment variable");
    }

    /**
     * Short - Set database password
     *
     * Detailed - 
     *
     * @param Type $name Description
     *
     * @return retour
     */
    private function changerMdpBDDEnv()
    {
        // return $this->avoirEnvVarsMode()['USER_PASSWORD'];
        // putenv("user_pass=".$this->avoirEnvVarsMode()['USER_PASSWORD']) || logError("Impossible to set user_pass environment variable");
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @return string Env mode
     */
    public function avoirModeEnv()
    {
        return $this->mode;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @return bool Env mode equals to "DEVELOP"
     */
    public function estPhaseDev()
    {
        return $this->mode == "DEVELOP";
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @return bool Env mode equals to "PRODUCTION"
     */
    public function estPhaseProd()
    {
        return $this->mode == "PRODUCTION";
    }

    /**
     * Short - Get the current full url
     * 
     * Detailed- 
     * 
     * @return url The current url
     */
    public function avoirURLBase()
    {
        if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') 
            $link = "https";
        else
            $link = "http";
        
        // Here append the common URL characters. 
        $link .= "://"; 
        
        // Append the host(domain name, ip) to the URL. 
        $link .= $_SERVER['HTTP_HOST'];

        return $link.$GLOBALS['particule_url'];
    }

    /**
     * Short - Get the current full url
     * 
     * Detailed- 
     * 
     * @return url The current url
     */
    public function avoirURLActuelle()
    {
        return $this->avoirURLBase().$_SERVER['REQUEST_URI'];
    }

    /**
     * Short - Get the current page datas
     * 
     * Detailed- 
     * 
     * @return datas The current page datas
     */
    public function getParametresPage($page = "")
    {
        switch($page)
        {
            case "home":
            default:
                return [];
        }
    }

    /**
     * Short - Get the icons dir path
     * 
     * Detailed- 
     * 
     * @return 
     */
    public function cheminIcones()
    {
        return $this->avoirURLBase().'/'.self::DEFAULT['ICONS_PATH'];
    }

    /**
     * Short - Get the default icons src
     * 
     * Detailed- 
     * 
     * @return datas The current src of a default icon
     */
    public function avoirCheminIconesParDefaut($name)
    {
        if(file_exists(self::DEFAULT['ICONS_PATH'].$this->securiserChaineExterne($name)))
        {
            return $this->avoirURLBase().self::DEFAULT['ICONS_PATH'].$this->securiserChaineExterne($name);
        }
        else
        {
            return $this->avoirURLBase().self::DEFAULT['IMAGES_PATH'].'no-img.png';
        }
    }

    /**
     * Short - Get the default icons set
     * 
     * Detailed - 
     * 
     * @return icons_set The current icons default set
     */
    public function iconesParDefaut()
    {
        $temp = [];
        foreach(scandir(self::DEFAULT['ICONS_PATH']) as $value)
        {
            !in_array($value, ['.', '..']) && $temp[pathinfo($value, PATHINFO_FILENAME)] = $this->avoirURLBase().self::DEFAULT['ICONS_PATH'].$value;
        }
        return $temp;
    }

    /**
     * Short - Get the images dir path
     * 
     * Detailed- 
     * 
     * @return 
     */
    public function cheminImages()
    {
        return $this->avoirURLBase().'/'.self::DEFAULT['IMAGES_PATH'];
    }

    /**
     * Short - Get the default images src
     * 
     * Detailed- 
     * 
     * @return string The current src of a default image
     */
    public function avoirCheminImagesParDefaut($name)
    {
        if(file_exists(self::DEFAULT['IMAGES_PATH'].$this->securiserChaineExterne($name)))
        {
            return $this->avoirURLBase().self::DEFAULT['IMAGES_PATH'].$this->securiserChaineExterne($name);
        }
        else
        {
            return $this->avoirURLBase().self::DEFAULT['IMAGES_PATH'].'no-img.png';
        }
    }

    /**
     * Short - Get the default images set
     * 
     * Detailed - 
     * 
     * @return mixed The current images default set
     */
    public function imagesParDefaut()
    {
        $temp = [];
        foreach(scandir(self::DEFAULT['IMAGES_PATH']) as $value)
        {
            !in_array($value, ['.', '..']) && $temp[pathinfo($value, PATHINFO_FILENAME)] = $this->avoirURLBase().self::DEFAULT['IMAGES_PATH'].$value;
        }
        return $temp;
    }

    /**
     * Short - Get the default tech list
     * 
     * Detailed - 
     * 
     * @return mixed The current default tech list
     */
    public function avoirListeIconesDefaut()
    {
        $temp = [];
        foreach(scandir(self::DEFAULT['ICONS_PATH']) as $value)
        {
            !in_array($value, ['.', '..']) && array_push($temp, pathinfo($value, PATHINFO_FILENAME));
        }
        return $temp;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string $route Road for path
     * @return string Path
     */
    public function avoirURL(string $route, string $param = null)
    {
        if(gettype($route) != "string")
        {
            return '';
        }

        switch($route)
        {
            case 'home': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/';

            case 'orders': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/orders';
            case 'order-signature': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/order-signature';
            case 'order-details': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/order-details';
            case 'order-payment-update': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/order-payment-update';
            case 'order-create': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/order-create';
            case 'order-load': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/order-load';
            case 'order-cancel': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/order-cancel';
            
            case 'get': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/get';
            case 'create': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/create';
            
            case 'user': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/user';
            case 'signup': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/signup';
            case 'login': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/login';
            case 'logout': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/logout';
            case 'admin': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/'.$_ENV['particule_admin_secret'];
            case 'profile': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/profile';
            
            case 'forbidden': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/forbidden';
            case '500': return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/500';
            case '404':
            default: return /*$GLOBALS['particule_url'].($this->estAdminZone() == true ? '/'.$_ENV['particule_admin_secret'] : '').*/'/404';;
        }
    }

    const DEFAULT = [
        'ICONS_PATH' => "private/icons/",
        'IMAGES_PATH' => "private/images/",
    ];

    const DEVELOP = [
        'particule_admin_secret' => 'admin',
        'DB_HOST' => '127.0.0.1',
        'DB_NAME' => 'infradmin_dev',
        'DB_PORT' => '3306',
        'USER_NAME' => 'root',
        'USER_PASSWORD' => '',
    ];

    const STAGING = [
        'particule_admin_secret' => 'fz684ef6reg64zqg6trh4se6aq8f4ht6r4',
        'DB_HOST' => '127.0.0.1',
        'DB_NAME' => 'infr2333_infradmin',
        'DB_PORT' => '3306',
        'USER_NAME' => 'infr2333_infradmin',
        'USER_PASSWORD' => '%r~NkVdF^O4{',
    ];

    const PRODUCTION = [
        'particule_admin_secret' => 'fz684ef6reg64zqg6trh4se6aq8f4ht6r4',
        'DB_HOST' => '127.0.0.1',
        'DB_NAME' => 'infr2333_infradmin',
        'DB_PORT' => '3306',
        'USER_NAME' => 'infr2333_infradmin',
        'USER_PASSWORD' => '%r~NkVdF^O4{',
    ];
}