module.exports = {
    routes: {
        index: '/',
        login: '/login',
        logout: '/logout',
        register: '/register',
        admin: '/admin',
        timeline: '/timeline',
        signIn: '/sign-in',
        uploadCSV: '/upload-csv'
    },
    pages: {
        index: 'pages/index',
        login: 'pages/login',
        register: 'pages/register',
        admin: 'pages/admin-dashboard',
        createEvent: 'pages/create-event',
        createAnnouncement: 'pages/create-announcement',
        createPage: 'pages/create-page',
        createUser: 'pages/create-user',
        customPage: 'pages/custom-page',
        workshops: 'pages/workshops',
        timeline: '/pages/timeline'
    },
    pageNames: {
        index: "Hub",
        login: "Login",
        register: "Register",
        admin: "Control Panel",
        createEvent: "Create Event",
        createPage: "Create Page",
        createUser: "Create User",
        customPage: "Custom Page",
        createAnnouncement: "Create Announcement",
        sendText: "Send Text",
        timeline: "Timeline",
        workshops: "Workshops"
    }
};