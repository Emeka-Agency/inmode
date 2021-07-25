<?php

    $DEFAULT_DB_LOCALE = "DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";

    /**
    * Short - Database connection
    *
    * Detailed - 
    *
    * @param string|null $db_name
    * @param string|null $db_host
    * @param string|null $user_name
    * @param string|null $user_password
    *
    * @return mixed
    */
    function dbConnect($db_name = null, $db_host = null, $user_name = null, $user_password = null)
    {
        if($db_name != null && $db_host != null && $user_name != null && $user_password != null)
        {
            // TODO custom connection
            // TODO Check if values are not same as those one provided by $_ENV[[field_name]]
        }
        try
        {
            return new \PDO(
                'mysql:host='.$_ENV['db_host'].';dbname='.$_ENV['db_name'].';charset=utf8',
                $_ENV['user_name'],
                $_ENV['user_pass'],
                // array(
                    // \PDO::ATTR_PERSISTENT => true
                // )
            );
        }
        catch (\PDOException $e)
        {
            logEvent(" >>>>>>>>>> utils dbConnect() PDOException");
            logError('Étape '.(++$GLOBALS['index']).' - '.$e);
            return $GLOBALS['DB_NO_CONNECTION'];
        }
    }

    /**
    * Short - Database connection
    *
    * Detailed - 
    * 
    * @param string|null $db_host
    * @param string|null $user_name
    * @param string|null $user_password
    *
    * @return mixed flux mysqli
    */
    function hostConnect($db_host = null, $user_name = null, $user_password = null)
    {
        if($db_host != null && $user_name != null && $user_password != null)
        {
            // TODO custom connection
            // TODO Check if values are not same as those one provided by $_ENV[[field_name]]
        }
        try
        {
            logEvent('hostConnect()');
            logEvent(print_r($_ENV));
            logEvent('user_name : '.print_r($_ENV['user_name']).'<br>');
            logEvent('user_pass : '.print_r($_ENV['user_pass']).'<br>');
            logEvent('bd_host : '.print_r($_ENV['bd_host']).'<br>');
            logEvent('db_port : '.print_r($_ENV['db_port']).'<br>');
            logEvent('db_name : '.print_r($_ENV['db_name']).'<br>');
            logEvent("Attempt to connect ".$_ENV['user_name'].":".$_ENV['user_pass']."@".$_ENV['db_host'].":".$_ENV['db_port'].'/'.$_ENV['db_name']);
            $conn = new mysqli(
                $_ENV['db_host'],
                $_ENV['user_name'],
                $_ENV['user_pass'],
                NULL,
                $_ENV['db_port'],
                NULL
            );
            if($conn->connect_error)
            {
                logEvent(" >>>>>>>>>> utils hostConnect() : ".$GLOBALS['MYSQL_NO_CONNECTION']);
                logError('Étape '.(++$GLOBALS['index']).' - '.$conn->connect_error);
                throw new Exception($GLOBALS['MYSQL_NO_CONNECTION']);
            }
            return $conn;
        }
        catch (mysqli_sql_exception $e)
        {
            logEvent(" >>>>>>>>>> utils hostConnect() mysqli_sql_exception");
            logError('Étape '.(++$GLOBALS['index']).' - '.$e);
            return $GLOBALS['MYSQL_THROW_ERROR'];
        }
        catch (Exception $e)
        {
            logEvent(" >>>>>>>>>> utils hostConnect() Exception");
            logError('Étape '.(++$GLOBALS['index']).' - '.$e);
            return $e;
        }
    }

    /**
    * Short - Database request
    *
    * Detailed - 
    *
    * @param Type $name Description
    *
    * @return array
    */
    function dbRequest($request)
    {
        logEvent("dbRequest has to exec request '".$request."'");
        // TODO improve
        // TODO add tableRequest()
        // TODO add database creation fallback
        // DONE dbConnect()->query($request);
        try
        {
            $conn = dbConnect();
            if(gettype($conn) == "integer")
            {
                logEvent(' >>>>>>>>>> Connection trial error');
                logError('Étape '.(++$GLOBALS['index']).' - '."Connection trial to host ended with status ".$conn);
                throw new Exception($conn);
            }
            $flux = $conn->prepare($request);
            $flux->execute();
            $result = $flux->fetchAll();
            $flux = NULL;
            $conn = NULL;
            return $result;
        }
        catch (PDOException $e)
        {
            if(isset($conn))
            {
                $conn = NULL;
            }
            logEvent(' >>>>>>>>>> PDOException');
            logError('Étape '.(++$GLOBALS['index']).' - '.$e);
            return $GLOBALS['DB_REQUEST_ERROR'];
        }
        catch (Exception $e)
        {
            logEvent(' >>>>>>>>>> Exception');
            logError('Étape '.(++$GLOBALS['index']).' - '.$e);
            return $GLOBALS['DB_REQUEST_ERROR'];
        }
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string
     * 
     * @return boolean
     */
    function dbExists($db_name = null)
    {
        $result = dbRequest("SHOW DATABASES LIKE '".($db_name != null ? $db_name : $_ENV['db_name'])."'");
        if(gettype($result) == "array")
        {
            return empty($result) ? false : true;
        }
        return false;
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string
     * 
     * @return boolean
     */
    function tableExists($table_name)
    {
        $result = dbRequest("SHOW TABLES LIKE '".$table_name."'");
        if(gettype($result) == "array")
        {
            return empty($result) ? false : true;
        }
        return false;
    }

    /**
     * Short - Secure mysql var inputs
     * 
     * Detailed - 
     * 
     * @param string $input Incoming parameter to be secured
     * @param mysqli $mysql Actual mysqli flux
     * 
     * @return string Input valid for secure mysql usage
     */
    function mysqliSanitizeInput($input, $mysql = null):string
    {
        if($mysql == null)
        {
            $mysql = hostConnect();
        }
        switch(gettype($input))
        {
            case "integer":
            case "float":
            case "double":
                return ctype_digit($input);
            case "string":
                return $mysql->real_escape_string($input);
            case "boolean":
                $input ? 'true' : 'false';
            case "array":
            case "object":
                return $mysql->real_escape_string(json_encode($input));
            case "NULL":
                return NULL;
            case "resource":
            default:
                return '';
        }
    }

    /**
     * Short - Secure mysql var inputs
     * 
     * Detailed - 
     * 
     * @param mysqli Actual mysqli flux
     * @param any Incoming parameter to be secured
     * 
     * @return string Input valid for secure mysql usage
     */
    function pdoSanitizeInput($input, $pdo = null)
    {
        if($pdo == null)
        {
            $pdo = dbConnect();
        }
        switch(gettype($input))
        {
            case "integer":
            case "float":
            case "double":
                return ctype_digit($input);
            case "string":
                return $pdo->quote($input);
            case "boolean":
                $input ? 'true' : 'false';
            case "array":
            case "object":
                return $pdo->quote(json_encode($input));
            case "NULL":
                return NULL;
            case "resource":
            default:
                return '';
        }
    }

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * 
     */
    function createDb($name = null, $locale = null)
    {
        try
        {
            if(gettype($conn = hostConnect()) == "integer")
            {
                logEvent(' >>>>>>>>>> App createDb() : connection trial error');
                logError('Étape '.(++$GLOBALS['index']).' - '."Connection trial to host ended with status ".$conn);
                throw new Exception($conn);
            }
            else
            {
                logEvent("Connection to host succeded");
                logEvent("Attempt to create database ".$_ENV['db_name']);
                logEvent("SQL request : \"CREATE DATABASE IF NOT EXISTS ".mysqliSanitizeInput($_ENV['db_name'], $conn)." ".mysqliSanitizeInput($locale != null ? $locale : $GLOBALS['DEFAULT_DB_LOCALE'], $conn)."\"");
                if($conn->query("CREATE DATABASE IF NOT EXISTS ".mysqliSanitizeInput($_ENV['db_name'], $conn)." ".mysqliSanitizeInput($locale != null ? $locale : $GLOBALS['DEFAULT_DB_LOCALE'], $conn)) == false)
                {
                    logEvent(" >>>>>>>>>> App createDb() : database creation error");
                    logError('Étape '.(++$GLOBALS['index']).' - '."Database creation failed");
                    $error = $conn->error;
                    $conn->close();
                    throw new Exception($error);
                }
                else
                {
                    logEvent("Database `".$_ENV['db_name']."` was successfully created with hostConnect()");
                    // logEvent("Set current inworked database to `".$_ENV['db_name']."`");
                    return $GLOBALS['SUCCESS'];
                }
            }
        }
        catch (\mysqli_sql_exception $e)
        {
            logEvent(" >>>>>>>>>> App createDb() mysqli_sql_exception");
            logError('Étape '.(++$GLOBALS['index']).' - '.$e);
            return false;
        }
        catch (\Exception $e)
        {
            logEvent(" >>>>>>>>>> App createDb() Exception");
            logError('Étape '.(++$GLOBALS['index']).' - '.$e);
            return false;
        }
    }

    function createTable($name = NULL, $schema = NULL, $locale = null)
    {
        try
        {
            if(gettype($name) != "string" || gettype($schema) != "string")
            {
                logEvent(" >>>>>>>>>> createTable() error");
                logError('Étape '.(++$GLOBALS['index']).' - '."Invalid parameters for createTable(string \$name, string \$schema[, string \$locale])");
                throw new Exception($GLOBALS['INVALID_PARAMS']);
            }
            if(!dbExists($_ENV['db_name']))
            {
                if(createDb($_ENV['db_name'], $GLOBALS['DEFAULT_DB_LOCALE']) == false)
                {
                    throw new Exception("Database ".$_ENV['db_name']." does not exists", $GLOBALS['DB_DOES_NOT_EXISTS']);
                }
            }
            if(!tableExists($name))
            {
                if(gettype($conn = dbConnect()) == "integer")
                {
                    throw new Exception("You cannot access or connect to database right now", $GLOBALS['DB_NO_CONNECTION']);
                }
                else
                {
                    logEvent("Successfully connect to database `".$_ENV['db_name']."`");
                    logEvent("Attempt to create table ".$name);
                    logEvent("SQL request : \"CREATE TABLE IF NOT EXISTS ".$name." (".$schema.") ".($locale != null ? $locale : $GLOBALS['DEFAULT_DB_LOCALE'])."\"");
                    $conn->query("CREATE TABLE IF NOT EXISTS ".$name." (".$schema.") ".($locale != null ? $locale : $GLOBALS['DEFAULT_DB_LOCALE']));
                    if($error = $conn->errorInfo()[0] > 0)
                    {
                        logEvent("Table `".$name."` creation failed with dbConnect()");
                        throw new Exception($error);
                    }
                    logEvent("Table `".$name."` was successfully created with dbConnect()");
                    $conn = NULL;
                    return $GLOBALS['SUCCESS'];
                }
            }
            else
            {
                return $GLOBALS['SUCCESS'];
            }
        }
        catch (\PDOException $e)
        {
            logEvent(" >>>>>>>>>> App createTable() PDOException");
            logError('Étape '.(++$GLOBALS['index']).' - '.$e);
        }
        catch (\mysqli_sql_exception $e)
        {
            logEvent(" >>>>>>>>>> App createTable() mysqli_sql_exception");
            logError('Étape '.(++$GLOBALS['index']).' - '.$e);
        }
        catch (\Exception $e)
        {
            logEvent(" >>>>>>>>>> App createTable() Exception");
            logError('Étape '.(++$GLOBALS['index']).' - '.$e);
        }
    }