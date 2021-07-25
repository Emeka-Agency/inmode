<?php

    /**
     * Short - 
     * 
     * Detailed - 
     * 
     * @param string $method
     * @param string $action
     */
    function reset_request($method = "", $action = ""){
        logEvent('reset_request()');
        if($method == "POST") {
            if(isset($_POST[$action])) {
                unset($_POST[$action]);
            }
            unset($_POST);
        }
        if($method == "GET") {
            if(isset($_GET[$action])) {
                unset($_GET[$action]);
            }
            unset($_GET);
        }
        if($method == "DELETE") {
            if(isset($_DELETE[$action])) {
                unset($_DELETE[$action]);
            }
            unset($_DELETE);
        }
        if($method == "UPDATE") {
            if(isset($_UPDATE[$action])) {
                unset($_UPDATE[$action]);
            }
            unset($_UPDATE);
        }
    };