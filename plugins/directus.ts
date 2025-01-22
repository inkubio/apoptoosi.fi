import {
    createDirectus,
    rest,
    readItem,
    readItems,
    readFieldsByCollection,
    createItem,
    aggregate,
    readSingleton,
} from '@directus/sdk';
import type {
    ContactPage, ContactPageTranslations,
    Event,
    EventTranslations, General,
    HomePage,
    HomePageTranslation, Languages, Participants,
    SignUpPage,
    SignUpPageTranslations, Sponsors
} from '~/types/directus';

interface Schema {
    events: Event[];
    event_translations: EventTranslations[];
    homepage: HomePage;
    homepage_translations: HomePageTranslation[];
    signup: SignUpPage;
    signup_translations: SignUpPageTranslations[];
    contact: ContactPage;
    contact_translations: ContactPageTranslations[];
    general: General;
    languages: Languages[];
    sponsors: Sponsors[];
    participants: Participants[];
}

//const runtimeConfig = useRuntimeConfig()


export default defineNuxtPlugin(({$config}) => {
    const directus = createDirectus<Schema>($config.public.BASE_URL).with(rest());
    return {
        provide: {directus, readItem, readItems, readFieldsByCollection, createItem, aggregate, readSingleton},
    };
});