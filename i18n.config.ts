export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'fi',
    messages: {
        fi: {
            events: 'Tapahtumat',
            signup: 'Ilmoittautuminen',
            contact: 'Yhteystiedot',
            quota: 'Kiintiö',
            queue: 'Jonossa',
            open_quota: 'Avoin',
            invitee_quota: 'Kutsuvieras',
            signups: "Ilmoittautuneet",
            no_signup: "Ei ilmoittautuneita",
            no_events: "Tapahtumat julkaistaan myöhemmin.",
        },
        en: {
            events: 'Events',
            signup: 'Sign up',
            contact: 'Contact',
            quota: 'Quota',
            queue: 'Queue',
            open_quota: 'Open',
            invitee_quota: 'Invitee',
            signups: "Sign ups",
            no_signup: "No sing ups.",
            no_events: "The events will be published at a later date."
        }
    }
}))