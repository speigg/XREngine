import * as notifications from "../../hooks/notifications";

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [notifications.addFollowCreator],
    update: [],
    patch: [],
    remove: [notifications.removeFollowCreator]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};