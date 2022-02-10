import { v4 } from "uuid";
import { initDataCommonWords } from "./data";

const userId = v4();
const commonId = v4();
const deckId = v4();

interface User {
  id: string;
  name: string;
  password: string;
  words: {
    commonId: string;
    deckIds: string[];
  };
}

interface Token {
  userId: string;
  token: string;
}

interface Word {
  word: string;
  translate: string;
  context: string;
  added: number;
  repeatTime: number;
  studyLevel: number;
  id: string;
}

interface CommonWords {
  userId: string;
  id: string;
  list: Word[];
}

interface Deck {
  userId: string;
  id: string;
  name: string;
  list: Word[];
}

const data = {
  users: [
    {
      id: userId,
      name: "admin",
      password: "123456A",
      words: {
        commonId,
        deckIds: [deckId],
      },
    },
  ],

  tokens: [],

  words: {
    common: [
      {
        userId,
        id: commonId,
        list: initDataCommonWords,
      },
    ],

    decks: [
      {
        userId,
        id: deckId,
        name: "Animal",
        list: [
          {
            id: v4(),
            word: "cat",
            translate: "кот",
            added: Date.now(),
            repeatTime: 0,
            context: "Today I saw a beautiful cat, that has very long fur.",
          },
        ],
      },
    ],
  },
};

const dataUsers = "DATA_USERS";
const dataTokens = "DATA_TOKENS";
const currentToken = "ACCESS_TOKEN";

const dataCommonWords = "DATA_COMMON_WORDS";
const dataDecks = "DATA_DECKS";

const initStorage = () => {
  if (!getItem(dataUsers)) setItem(dataUsers, data.users);
  if (!getItem(dataTokens)) setItem(dataTokens, data.tokens);
  if (!getItem(dataCommonWords)) setItem(dataCommonWords, data.words.common);
  if (!getItem(dataDecks)) setItem(dataDecks, data.words.decks);
};

const getItem = (key: string) => JSON.parse(localStorage.getItem(key) || "");
const setItem = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));
const clear = (key: string) =>
  key ? localStorage.removeItem(key) : localStorage.clear();

// auth
const signup = ({ name, password }: { name: string; password: string }) => {
  const users = getItem(dataUsers);

  if (!users) return { data: null, error: "something wrong" };

  const user = users.find((us: User) => us.name === name);

  if (user) return { data: null, error: "user not exist" };

  if (password.length < 5) return { data: null, error: "password < 5" };

  const commonWords = getItem(dataCommonWords);
  const commonId = v4();
  const decks = getItem(dataDecks);
  const deckIds = [v4()];

  const newUser: User = {
    id: v4(),
    name,
    password,
    words: {
      commonId,
      deckIds,
    },
  };

  setItem(dataUsers, [...users, newUser]);
  setItem(dataCommonWords, [
    ...commonWords,
    { userId: newUser.id, id: commonId, list: [] },
  ]);
  setItem(dataDecks, [
    ...decks,
    ...deckIds.map((d) => ({ userId: newUser.id, id: d, list: [] })),
  ]);

  const newToken = v4();
  setItem(dataTokens, [
    ...(getItem(dataTokens) || []),
    { userId: newUser.id, token: newToken },
  ]);
  setItem(currentToken, newToken);

  const { password: p, ...userDto } = newUser;

  return { data: userDto, error: null };
};

const auth = ({ name, password }: { name: string; password: string }) => {
  const users = getItem(dataUsers);

  if (!users) return { data: null, error: "something wrong" };

  const user = users.find((us: User) => us.name === name);

  if (!user) return { data: null, error: "user not exist" };

  if (user.password !== password)
    return { data: null, error: "password wrong" };

  const newToken = v4();
  setItem(dataTokens, [
    ...(getItem(dataTokens) || []),
    { userId: user.id, token: newToken },
  ]);
  setItem(currentToken, newToken);

  const { password: p, ...userDto } = user;

  return { data: userDto, error: null };
};

const logout = () => {
  const curToken = getCurrentToken();

  if (!curToken) return false;

  const user = getCurrentUser();

  if (!user) return false;

  setItem(dataTokens, [
    ...(getItem(dataTokens) || []).filter(
      (t: Token) => t.token !== curToken.token
    ),
  ]);
  setItem(currentToken, null);

  return true;
};

const getCurrentToken = () => {
  const token = getItem(currentToken);
  if (!token) return false;

  return (getItem(dataTokens) || []).find((t: Token) => t.token === token);
};

const getCurrentUser = () => {
  const curToken = getCurrentToken();

  if (!curToken) return false;

  const user = (getItem(dataUsers) || []).find(
    (us: User) => us.id === curToken.userId
  );

  if (!user) return false;

  const { password, ...userDto } = user;

  return userDto;
};

const isLogged = () => !!getCurrentUser();

// words
const getCommonWords = () => {
  const user = getCurrentUser();

  if (!user) return null;

  const commonWords = (getItem(dataCommonWords) || []).find(
    (item: CommonWords) => item.id === user.words.commonId
  );

  if (!commonWords) return null;

  return commonWords.list;
};

const addCommonWord = (word: {
  word: string;
  translate: string;
  context: string;
}) => {
  const user = getCurrentUser();

  if (!user) return null;

  const commonWords = getCommonWords();

  if (!commonWords) return null;

  const newWord: Word = {
    ...word,
    added: Date.now(),
    repeatTime: 0,
    studyLevel: 0,
    id: v4(),
  };

  setItem(dataCommonWords, [
    ...(getItem(dataCommonWords) || []).map((item: CommonWords) =>
      item.userId === user.id
        ? { ...item, list: [...commonWords, newWord] }
        : item
    ),
  ]);

  return true;
};

const removeCommonWord = (id: string) => {
  const user = getCurrentUser();

  if (!user) return null;

  const commonWords = getCommonWords();

  if (!commonWords) return null;

  setItem(dataCommonWords, [
    ...(getItem(dataCommonWords) || []).map((item: CommonWords) =>
      item.userId === user.id
        ? { ...item, list: commonWords.filter((i: Word) => i.id !== id) }
        : item
    ),
  ]);

  return true;
};

const editCommonWord = (
  id: string,
  word: { word: string; translate: string; context: string }
) => {
  const user = getCurrentUser();

  if (!user) return null;

  const commonWords = getCommonWords();

  if (!commonWords) return null;

  setItem(dataCommonWords, [
    ...(getItem(dataCommonWords) || []).map((item: CommonWords) =>
      item.userId === user.id
        ? {
            ...item,
            list: commonWords.map((i: Word) =>
              i.id === id ? { ...i, ...word } : i
            ),
          }
        : item
    ),
  ]);

  return true;
};

// const getRandomEls = (arr, n) =>
//   arr.sort(() => Math.random() - Math.random()).slice(0, n);

export const getRandomEls = (arr: any[], n: number) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) return arr.sort(() => Math.random() - Math.random());
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

const getNewRepeatTime = (currLevel: number): number => {
  const days =
    currLevel === 0
      ? 3
      : currLevel === 1
      ? 7
      : currLevel === 2
      ? 30
      : currLevel === 3
      ? 30.5 * 6
      : 0;

  return new Date(Date.now() + 1000 * 60 * 60 * 24 * days).setHours(5, 0, 0);
};

//training
const getRandomWordsToTraining = (
  countWordsToTraining = 5,
  isAnswers = false
) => {
  const allWords = getCommonWords();
  if (!allWords) return null;

  if (isAnswers) {
    return getRandomEls(allWords, countWordsToTraining);
  }

  const wordsForRepeat = allWords.filter(
    (w: Word) => w.repeatTime !== 0 && w.repeatTime < Date.now()
  );

  if (wordsForRepeat.length >= countWordsToTraining) {
    return getRandomEls(wordsForRepeat, countWordsToTraining);
  }

  if (wordsForRepeat.length < countWordsToTraining) {
    const howManyNeed = countWordsToTraining - wordsForRepeat.length;

    const words = [
      ...wordsForRepeat,
      ...getRandomEls(
        allWords.filter((w: Word) => !w.repeatTime),
        howManyNeed
      ),
    ];

    // if (words.length < countWordsToTraining) return "not enough";

    return words;
  }
};

const updateLevelAndTimeToRepeat = (id: string, level: number) => {
  const user = getCurrentUser();
  if (!user) return null;

  const allWords = getCommonWords();
  if (!allWords) return null;

  const repeatTime = getNewRepeatTime(level);

  setItem(dataCommonWords, [
    ...(getItem(dataCommonWords) || []).map((item: CommonWords) =>
      item.userId === user.id
        ? {
            ...item,
            list: allWords.map((w: Word) =>
              w.id === id
                ? { ...w, studyLevel: w.studyLevel + 1, repeatTime }
                : w
            ),
          }
        : item
    ),
  ]);

  return true;
};

const store = {
  initStorage,
  signup,
  auth,
  isLogged,
  getCurrentUser,
  logout,
  getCommonWords,
  addCommonWord,
  removeCommonWord,
  editCommonWord,
  getRandomWordsToTraining,
  updateLevelAndTimeToRepeat,
};

export default store;
