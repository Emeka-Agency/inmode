import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/seo";
import Profile from "../components/Profile";
import { useUser } from "../components/contexts/user-provider";

const ProfilePage = () => {

    if(useUser().logged() == false && typeof window != "undefined") {
        window.location.href = "/";
    }

    return (
        <Layout title="profil">
            <SEO lang="fr" title="Profil"/>
            <Profile/>
        </Layout>
    );
};

export default ProfilePage;