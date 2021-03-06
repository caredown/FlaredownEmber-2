
export default {
  step: {
    onboarding: {
      personal: {
        title: "Create an account to get started",
      },
      demographic: {
        title: "Donate extra data for research (optional)",
      },
      conditions: {
        title: "What conditions will you track?",
        hint: "A condition is an umbrella problem that may include many symptoms. For example, Crohn’s Disease or fibromyalgia.",
      },
      symptoms: {
        title: "What symptoms will you track?",
        hint: "Symptoms are the specific physical or mental problems that you want to treat. For example, chest pain or fatigue.",
      },
      treatments: {
        title: "What treatments will you track?",
        hint: "Treatments can be anything you use to improve your symptoms. For example: prednisone or a dairy-free diet.<br>List all treatments you are currently using, each day we will ask which you took, and let you enter dosages.",
      },
      reminder: {
        title: "Should we remind you to check in?",
        hint: "You can change this later in settings.",
        reminderOff: "Don't remind me",
        reminderOn: "Send me an email reminder",
      },
      completed: {
        title: "Set up complete! You're ready for your first checkin.",
      },
    },

    checkin: {
      start: {
        hint: "Tap <b>next</b> to get started!",
        title: "You haven't checked in yet today",
      },
      conditions: {
        title: "How active were your conditions today?",
        shortTitle: "Conditions",
      },
      harvey_bradshaw: {
        hint: "Complete this medically-validated survey regularly so Flaredown can track your disease progression.",
        title: "Harvey-Bradshaw Index",
        shortTitle: "Harvey-Bradshaw",
      },
      promotion_rate: {
        hint: "Rate Flaredown",
        title: "Rate Flaredown",
        rateBody: "How likely is it that you would recommend Flaredown to a friend?",
        feedBackLabel: 'Send feedback',
        shortTitle: "Feedback",
        reviewHeader: 'Glad you like it!',
        reviewText: 'We\'re a small patient-run project, sharing really helps us out:',
        reviewIosLabel: 'Review on iOS App Store',
        reviewGPLabel: 'Review on Google Play Store',
        reviewShare: 'Share',
        shareTitleFb: 'I\'m using www.flaredown.com to track symptoms',
        shareTitleTw: 'I\'m using @flaredown to track symptoms',
        feedBackHeader: 'How can we do it better?',
        feedBackPlaceHolder: 'Missing features, bugs, etc...',
      },
      symptoms: {
        title: "How active were your symptoms today?",
        shortTitle: "Symptoms",
      },
      treatments: {
        title: "Which treatments did you take today?",
        shortTitle: "Treatments",
      },
      health_factors: {
        title: "Health factors",
        shortTitle: "Health factors",
      },
      summary: {
        title: 'Summary for',
        shortTitle: "Summary",
      },
    },
  },

  history: {
    step: {
      initial: {
        title: 'History',
        text: 'Create a pattern to group your symptoms with treatments and triggers, like this:',
        buttonText: 'Create a Pattern',
      },
      creation: {
        patternName: 'Pattern name',
        selectLabel: 'Build your pattern',
        deleteText: 'Delete pattern',
        buttonText: 'Save pattern',
        maxTrackablesText: 'Patterns hold a maximum of 10 items, to add more you\'ll need to remove some of the above',
        placeholder: {
          some: 'Add symptoms,treatments and more...',
          none: 'No items to add',
        },
      },
      index: {
        newPatternText: '+ Create new pattern',
        sharePatternText: 'Share Patterns',
      }
    }
  },

  sharedPatterns: {
    dialog: {
      title: 'Which Patterns will you share?',
      buttonText: 'Share via Email',
      sharedUrl: 'Or copy this link to share anywhere',
      done: 'Done',
      loadMore: 'Load more...',
    },
  },

  clientAccess: {
    invalidSubdomain: 'There is no such subdomain',
    defaultAppName: 'Caredown',
    signupMessage: 'Your request is being processed',
    login: {
      header: 'Administrator Login',
    },
    signup: {
      header: 'Create your Caredown account',
      info: 'Please note: custom apps are <b>only avaliable in English</b> at this time',
    },
    new: {
      headerText: 'Set up your app',
    },
    dashboard: {
      wait: {
        grats: 'Nice work! <br> We\'re setting up your app now, you\'ll receive an email when it\'s ready.',
        btnValue: 'Back to Caredown',
      },
      invite: {
        header: 'Let\'s get your users on board!',
        btnValue: 'Send Email Invites',
        linkText: 'Or, ask them to visit this link:',
      },

      userIndex: {
        btnValue: '+ Invite users',
      },
      appTab: {
        customLabel: 'Custom (must be valid HEX color code)'
      }
    },
  }
};
