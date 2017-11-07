angular.module('nnConsumerUi')
  .config(function($translateProvider) {
    $translateProvider.translations('fi', {
      'REQUIRED_FIELD': 'Pakollinen kenttä',
      'CHARACTERS_LEFT': 'Merkkiä jäljellä',
      'CHOOSE_FILE': 'Valitse tiedosto',
      'EMPTY_TEXT': 'Valitse',
      'MENU_BUTTON': 'Valikko',
      'LOG_OUT_BUTTON': 'Kirjaudu ulos',
      'PRINT_BUTTON': 'Tulosta valitus',
      'SEND_MAIL_BUTTON': 'Lähetä Omaan Sähköpostiisi',
      'EMAIL_REQUIRED': 'Sähköpostiosoitetta ei ole annettu. Lisää oma sähköpostiosoitteesi',
      'MAIL_SENT_TEXT': 'Sähköposti lähetetty',
      'NEXT_TEXT': 'Seuraava',
      'CANCEL_TEXT': 'Peruuta',
      'CLOSE_TEXT': 'Sulje',
      'SAVE_INCOMPLETE': 'Tallenna keskeneräisenä',
      'SUMMARY_HEADING': 'Reklamaatio',
      'SUMMARY_FOOT_TEXT': 'Odotan vastaustanne kahden viikon kuluessa. Sen jälkeen minulla on mahdollisuus ottaa yhteyttä maistraattien kuluttajaneuvontaan.'
    });

    $translateProvider.translations('sv', {
      'REQUIRED_FIELD': 'Obligatoriskt fält',
      'CHARACTERS_LEFT': 'Tecken kvar',
      'CHOOSE_FILE': 'Välj fil',
      'EMPTY_TEXT': 'Välj',
      'MENU_BUTTON': 'Meny',
      'LOG_OUT_BUTTON': 'Logga ut',
      'PRINT_BUTTON': 'Skriv ut reklamation',
      'SEND_MAIL_BUTTON': 'Skicka till e-post',
      'EMAIL_REQUIRED': 'E-post saknas. Var vänlig och fyll i e-post.',
      'MAIL_SENT_TEXT': 'E-post skickad',
      'NEXT_TEXT': 'Nästa',
      'CANCEL_TEXT': 'Avbryt',
      'CLOSE_TEXT': 'Stäng',
      'SAVE_INCOMPLETE': 'Spara hälvfärdig',
      'SUMMARY_HEADING': 'Reklamation',
      'SUMMARY_FOOT_TEXT': 'Jag förväntar mig svar inom två veckor. Efter det kan jag kontakta maistratens konsumentrådgivning.'
    });

    $translateProvider.translations('en', {
      'REQUIRED_FIELD': 'Required field',
      'CHARACTERS_LEFT': 'Characters left',
      'CHOOSE_FILE': 'Choose file',
      'EMPTY_TEXT': 'Select',
      'MENU_BUTTON': 'Menu',
      'LOG_OUT_BUTTON': 'Log out',
      'PRINT_BUTTON': 'Print complaint',
      'SEND_MAIL_BUTTON': 'Send to e-mail',
      'EMAIL_REQUIRED': 'E-mail missing. Please add your e-mail address',
      'MAIL_SENT_TEXT': 'E-mail sent',
      'NEXT_TEXT': 'Next',
      'CANCEL_TEXT': 'Cancel',
      'CLOSE_TEXT': 'Close',
      'SAVE_INCOMPLETE': 'Save as incomplete',
      'SUMMARY_HEADING': 'Complaint',
      'SUMMARY_FOOT_TEXT': 'I await an answer within two weeks. Thereafter I may choose to contact the registry office\'s consumer advice.'
    });

    $translateProvider.preferredLanguage('fi');
    $translateProvider.useSanitizeValueStrategy(null);
  });
