import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: string;
  JSON: Record<string, unknown>;
  JSONObject: Record<string, unknown>;
  Time: string;
};

export type Banner = {
  __typename?: 'Banner';
  id: Scalars['Int'];
  backgroundUrl: Scalars['String'];
  mainText?: Maybe<Scalars['String']>;
  mainTextColor?: Maybe<Scalars['String']>;
  mainTextFontSize?: Maybe<Scalars['Int']>;
  subText?: Maybe<Scalars['String']>;
  subTextColor?: Maybe<Scalars['String']>;
  subTextFontSize?: Maybe<Scalars['Int']>;
  textPlacement?: Maybe<Placement>;
  button1Link?: Maybe<Scalars['String']>;
  button1Text?: Maybe<Scalars['String']>;
  button1BackgroundColor?: Maybe<Scalars['String']>;
  button1TextColor?: Maybe<Scalars['String']>;
  button2Link?: Maybe<Scalars['String']>;
  button2Text?: Maybe<Scalars['String']>;
  button2BackgroundColor?: Maybe<Scalars['String']>;
  button2TextColor?: Maybe<Scalars['String']>;
  buttonsFontSize?: Maybe<Scalars['Int']>;
  buttonsVerticalPlacement?: Maybe<Placement>;
  buttonsHorizontalPlacement?: Maybe<Placement>;
  condition?: Maybe<BannerCondition>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  active: Scalars['Boolean'];
};

export type BannerCondition =
  | 'ALL'
  | 'GUEST'
  | 'LOGGEDIN'
  | 'EO'
  | 'PLAYER';

export type Contact = {
  __typename?: 'Contact';
  id: Scalars['Int'];
  name: Scalars['String'];
  email: Scalars['String'];
  text: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userContact?: Maybe<User>;
};

export type CreateBannerInput = {
  backgroundUrl: Scalars['String'];
  mainText?: Maybe<Scalars['String']>;
  mainTextColor?: Maybe<Scalars['String']>;
  mainTextFontSize?: Maybe<Scalars['Int']>;
  subText?: Maybe<Scalars['String']>;
  subTextColor?: Maybe<Scalars['String']>;
  subTextFontSize?: Maybe<Scalars['Int']>;
  textPlacement?: Maybe<Placement>;
  button1Link?: Maybe<Scalars['String']>;
  button1Text?: Maybe<Scalars['String']>;
  button1BackgroundColor?: Maybe<Scalars['String']>;
  button1TextColor?: Maybe<Scalars['String']>;
  button2Link?: Maybe<Scalars['String']>;
  button2Text?: Maybe<Scalars['String']>;
  button2BackgroundColor?: Maybe<Scalars['String']>;
  button2TextColor?: Maybe<Scalars['String']>;
  buttonsFontSize?: Maybe<Scalars['Int']>;
  buttonsVerticalPlacement?: Maybe<Placement>;
  buttonsHorizontalPlacement?: Maybe<Placement>;
  condition?: Maybe<BannerCondition>;
  active: Scalars['Boolean'];
};

export type CreateContactInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  text: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
};

export type CreateMatchInput = {
  roundId: Scalars['Int'];
  tournamentId: Scalars['Int'];
  active: Scalars['Boolean'];
};

export type CreatePlayerMatchScoreInput = {
  score?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
  matchId?: Maybe<Scalars['Int']>;
};

export type CreatePlayerTournamentScoreInput = {
  wins: Scalars['Int'];
  draws: Scalars['Int'];
  losses: Scalars['Int'];
  byes: Scalars['Int'];
  score: Scalars['Float'];
  wonTournament: Scalars['Boolean'];
  playerId: Scalars['String'];
  tournamentId: Scalars['Int'];
};

export type CreateRoundInput = {
  tournamentId: Scalars['Int'];
  roundNumber: Scalars['Int'];
  active: Scalars['Boolean'];
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  roundTimerLeftInSeconds?: Maybe<Scalars['Int']>;
};

export type CreateStoreInput = {
  name: Scalars['String'];
  ownerId: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  street1: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  zip: Scalars['String'];
  distributor: Scalars['String'];
  approved?: Maybe<Scalars['Boolean']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
};

export type CreateTournamentInput = {
  name: Scalars['String'];
  tournamentUrl: Scalars['String'];
  startDate: Scalars['DateTime'];
  dateStarted?: Maybe<Scalars['DateTime']>;
  dateEnded?: Maybe<Scalars['DateTime']>;
  maxPlayers: Scalars['Int'];
  locationName: Scalars['String'];
  infoUrl?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  storeId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  timerLeftInSeconds?: Maybe<Scalars['Int']>;
  timerStatus?: Maybe<TimerStatus>;
  timerLastUpdated?: Maybe<Scalars['DateTime']>;
};

export type CreateUserInput = {
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  howHeard?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['Int']>;
  adminComments?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  disabledOn?: Maybe<Scalars['DateTime']>;
  nickname: Scalars['String'];
  userPictureId?: Maybe<Scalars['Int']>;
  disabledBy?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  dob?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Role>;
  imageId?: Maybe<Scalars['Int']>;
};

export type CreateUserPictureInput = {
  name?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  smallUrl?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type CreateUserStoreInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  street1: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  zip: Scalars['String'];
  distributor: Scalars['String'];
};





export type Match = {
  __typename?: 'Match';
  id: Scalars['Int'];
  roundId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  tournamentId: Scalars['Int'];
  active: Scalars['Boolean'];
  round: Round;
  tournament: Tournament;
  players: Array<Maybe<PlayerMatchScore>>;
};

export type MatchResult =
  | 'WIN'
  | 'TIED'
  | 'LOSS';

export type MatchScore = {
  userId: Scalars['String'];
  playerMatchScore: Scalars['Int'];
  score: Scalars['Int'];
  result: MatchResult;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMatchScore: Match;
  advanceRound?: Maybe<Tournament>;
  cancelTournament: Tournament;
  createBanner: Banner;
  createContact: Contact;
  createRound: Round;
  createStore: Store;
  createTournament: Tournament;
  createUser: User;
  createUserPicture: UserPicture;
  deleteBanner: Banner;
  deleteContact: Contact;
  deleteRound: Round;
  deleteStore: Store;
  deleteTournament: Tournament;
  deleteUser: User;
  deleteUserPicture: UserPicture;
  endTournament: Tournament;
  registerForTournament: Scalars['String'];
  startTournament: Tournament;
  updateBanner: Banner;
  updateContact: Contact;
  updateRound: Round;
  updateStore: Store;
  updateTimer: Tournament;
  updateTournament: Tournament;
  updateUser: User;
  updateUserPicture: UserPicture;
};


export type MutationAddMatchScoreArgs = {
  input: TournamentMatchScoreInput;
};


export type MutationAdvanceRoundArgs = {
  id: Scalars['Int'];
  roundNumber: Scalars['Int'];
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  roundTimerLeftInSeconds?: Maybe<Scalars['Int']>;
};


export type MutationCancelTournamentArgs = {
  id: Scalars['Int'];
};


export type MutationCreateBannerArgs = {
  input: CreateBannerInput;
};


export type MutationCreateContactArgs = {
  input: CreateContactInput;
};


export type MutationCreateRoundArgs = {
  input: CreateRoundInput;
};


export type MutationCreateStoreArgs = {
  input: CreateStoreInput;
};


export type MutationCreateTournamentArgs = {
  input: CreateTournamentInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
  storeInput?: Maybe<CreateUserStoreInput>;
};


export type MutationCreateUserPictureArgs = {
  input: CreateUserPictureInput;
};


export type MutationDeleteBannerArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteContactArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteRoundArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteStoreArgs = {
  id: Scalars['String'];
};


export type MutationDeleteTournamentArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserPictureArgs = {
  id: Scalars['Int'];
};


export type MutationEndTournamentArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterForTournamentArgs = {
  id: Scalars['Int'];
};


export type MutationStartTournamentArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateBannerArgs = {
  id: Scalars['Int'];
  input: UpdateBannerInput;
};


export type MutationUpdateContactArgs = {
  id: Scalars['Int'];
  input: UpdateContactInput;
};


export type MutationUpdateRoundArgs = {
  id: Scalars['Int'];
  input: UpdateRoundInput;
};


export type MutationUpdateStoreArgs = {
  id: Scalars['String'];
  input: UpdateStoreInput;
};


export type MutationUpdateTimerArgs = {
  input: TimerInput;
};


export type MutationUpdateTournamentArgs = {
  id: Scalars['Int'];
  input: UpdateTournamentInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  input: UpdateUserInput;
};


export type MutationUpdateUserPictureArgs = {
  id: Scalars['Int'];
  input: UpdateUserPictureInput;
};

export type Placement =
  | 'center'
  | 'start'
  | 'end';

export type PlayerMatchScore = {
  __typename?: 'PlayerMatchScore';
  id: Scalars['Int'];
  score?: Maybe<Scalars['Int']>;
  bye?: Maybe<Scalars['Boolean']>;
  wonMatch?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  match?: Maybe<Match>;
  matchId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type PlayerTournamentScore = {
  __typename?: 'PlayerTournamentScore';
  id: Scalars['Int'];
  wins: Scalars['Int'];
  byes: Scalars['Int'];
  draws: Scalars['Int'];
  losses: Scalars['Int'];
  score: Scalars['Float'];
  rank?: Maybe<Scalars['Int']>;
  totalScore?: Maybe<Scalars['Float']>;
  totalPoints?: Maybe<Scalars['Float']>;
  totalTournamentsPlayed?: Maybe<Scalars['Int']>;
  wonTournament: Scalars['Boolean'];
  playerId: Scalars['String'];
  player: User;
  tournamentId: Scalars['Int'];
  tournament: Tournament;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Provider = {
  __typename?: 'Provider';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  type: Scalars['String'];
  user?: Maybe<User>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  banner?: Maybe<Banner>;
  banners: Array<Banner>;
  checkNickname: Scalars['Boolean'];
  contact?: Maybe<Contact>;
  contacts: Array<Contact>;
  finishedTournaments: Array<Tournament>;
  homeBanners: Array<Banner>;
  matches: Array<Match>;
  myTournaments: Array<Tournament>;
  playerLeaderboard: Array<PlayerTournamentScore>;
  playerMatchScores: Array<PlayerMatchScore>;
  playerTournamentScores: Array<PlayerTournamentScore>;
  redwood?: Maybe<Redwood>;
  round?: Maybe<Round>;
  rounds: Array<Round>;
  searchTournaments: Array<Tournament>;
  store?: Maybe<Store>;
  stores: Array<Store>;
  tournament?: Maybe<Tournament>;
  tournamentByUrl?: Maybe<Tournament>;
  tournaments: Array<Tournament>;
  upcomingTournaments: Array<Tournament>;
  user?: Maybe<User>;
  userPicture?: Maybe<UserPicture>;
  userPictures: Array<UserPicture>;
  users: Array<User>;
};


export type QueryBannerArgs = {
  id: Scalars['Int'];
};


export type QueryCheckNicknameArgs = {
  nickname?: Maybe<Scalars['String']>;
};


export type QueryContactArgs = {
  id: Scalars['Int'];
};


export type QueryFinishedTournamentsArgs = {
  input?: Maybe<SearchTournamentInput>;
};


export type QueryPlayerLeaderboardArgs = {
  nicknameSearch?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryRoundArgs = {
  id: Scalars['Int'];
};


export type QuerySearchTournamentsArgs = {
  input: SearchTournamentInput;
};


export type QueryStoreArgs = {
  id: Scalars['String'];
};


export type QueryTournamentArgs = {
  id: Scalars['Int'];
};


export type QueryTournamentByUrlArgs = {
  url?: Maybe<Scalars['String']>;
};


export type QueryUpcomingTournamentsArgs = {
  input?: Maybe<SearchTournamentInput>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUserPictureArgs = {
  id: Scalars['Int'];
};

export type Redwood = {
  __typename?: 'Redwood';
  version?: Maybe<Scalars['String']>;
  currentUser?: Maybe<Scalars['JSON']>;
  prismaVersion?: Maybe<Scalars['String']>;
};

export type Role =
  | 'PLAYER'
  | 'EO';

export type Round = {
  __typename?: 'Round';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  tournamentId: Scalars['Int'];
  roundNumber: Scalars['Int'];
  active: Scalars['Boolean'];
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  roundTimerLeftInSeconds?: Maybe<Scalars['Int']>;
  tournament: Tournament;
  matches: Array<Maybe<Match>>;
};

export type SearchTournamentInput = {
  name?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  openSpotsOnly: Scalars['Boolean'];
  dateStart?: Maybe<Scalars['Date']>;
  dateEnd?: Maybe<Scalars['Date']>;
  distance?: Maybe<Scalars['Int']>;
};

export type Store = {
  __typename?: 'Store';
  id: Scalars['String'];
  name: Scalars['String'];
  tournaments: Array<Maybe<Tournament>>;
  owner: User;
  ownerId: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  street1: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  zip: Scalars['String'];
  distributor: Scalars['String'];
  approved?: Maybe<Scalars['Boolean']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
};


export type TimerInput = {
  tournamentId: Scalars['Int'];
  timerLeftInSeconds: Scalars['Int'];
  timerStatus: TimerStatus;
  startingTimerInSeconds: Scalars['Int'];
};

export type TimerStatus =
  | 'PENDING'
  | 'INPROGRESS'
  | 'PAUSED'
  | 'STOPPED';

export type Tournament = {
  __typename?: 'Tournament';
  id: Scalars['Int'];
  name: Scalars['String'];
  desc?: Maybe<Scalars['String']>;
  tournamentUrl: Scalars['String'];
  distance?: Maybe<Scalars['Float']>;
  playerCount?: Maybe<Scalars['Int']>;
  startDate: Scalars['DateTime'];
  dateStarted?: Maybe<Scalars['DateTime']>;
  dateEnded?: Maybe<Scalars['DateTime']>;
  maxPlayers: Scalars['Int'];
  locationName: Scalars['String'];
  infoUrl?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['String']>;
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  timerLeftInSeconds?: Maybe<Scalars['Int']>;
  timerStatus?: Maybe<TimerStatus>;
  timerLastUpdated?: Maybe<Scalars['DateTime']>;
  storeId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  owner?: Maybe<User>;
  store?: Maybe<Store>;
  user?: Maybe<User>;
  matches: Array<Maybe<Match>>;
  players: Array<Maybe<PlayerTournamentScore>>;
  winners?: Maybe<Array<Maybe<PlayerTournamentScore>>>;
  round: Array<Maybe<Round>>;
  active: Scalars['Boolean'];
};

export type TournamentMatchScoreInput = {
  matchId: Scalars['Int'];
  matches: Array<Maybe<MatchScore>>;
};

export type UpdateBannerInput = {
  backgroundUrl?: Maybe<Scalars['String']>;
  mainText?: Maybe<Scalars['String']>;
  mainTextColor?: Maybe<Scalars['String']>;
  mainTextFontSize?: Maybe<Scalars['Int']>;
  subText?: Maybe<Scalars['String']>;
  subTextColor?: Maybe<Scalars['String']>;
  subTextFontSize?: Maybe<Scalars['Int']>;
  textPlacement?: Maybe<Placement>;
  button1Link?: Maybe<Scalars['String']>;
  button1Text?: Maybe<Scalars['String']>;
  button1BackgroundColor?: Maybe<Scalars['String']>;
  button1TextColor?: Maybe<Scalars['String']>;
  button2Link?: Maybe<Scalars['String']>;
  button2Text?: Maybe<Scalars['String']>;
  button2BackgroundColor?: Maybe<Scalars['String']>;
  button2TextColor?: Maybe<Scalars['String']>;
  buttonsFontSize?: Maybe<Scalars['Int']>;
  buttonsVerticalPlacement?: Maybe<Placement>;
  buttonsHorizontalPlacement?: Maybe<Placement>;
  condition?: Maybe<BannerCondition>;
  active?: Maybe<Scalars['Boolean']>;
};

export type UpdateContactInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type UpdateMatchInput = {
  roundId?: Maybe<Scalars['Int']>;
  tournamentId?: Maybe<Scalars['Int']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type UpdatePlayerMatchScoreInput = {
  score?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
  matchId?: Maybe<Scalars['Int']>;
};

export type UpdatePlayerTournamentScoreInput = {
  wins?: Maybe<Scalars['Int']>;
  draws?: Maybe<Scalars['Int']>;
  losses?: Maybe<Scalars['Int']>;
  byes?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Float']>;
  wonTournament: Scalars['Boolean'];
  playerId?: Maybe<Scalars['String']>;
  tournamentId?: Maybe<Scalars['Int']>;
};

export type UpdateRoundInput = {
  tournamentId?: Maybe<Scalars['Int']>;
  roundNumber?: Maybe<Scalars['Int']>;
  active?: Maybe<Scalars['Boolean']>;
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  roundTimerLeftInSeconds?: Maybe<Scalars['Int']>;
};

export type UpdateStoreInput = {
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  distributor?: Maybe<Scalars['String']>;
  approved?: Maybe<Scalars['Boolean']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
};

export type UpdateTournamentInput = {
  name?: Maybe<Scalars['String']>;
  tournamentUrl?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  dateStarted?: Maybe<Scalars['DateTime']>;
  dateEnded?: Maybe<Scalars['DateTime']>;
  maxPlayers?: Maybe<Scalars['Int']>;
  locationName?: Maybe<Scalars['String']>;
  infoUrl?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  storeId?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  timerLeftInSeconds?: Maybe<Scalars['Int']>;
  timerStatus?: Maybe<TimerStatus>;
  timerLastUpdated?: Maybe<Scalars['DateTime']>;
};

export type UpdateUserInput = {
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  howHeard?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['Int']>;
  adminComments?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  disabledOn?: Maybe<Scalars['DateTime']>;
  nickname?: Maybe<Scalars['String']>;
  userPictureId?: Maybe<Scalars['Int']>;
  disabledBy?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  imageId?: Maybe<Scalars['Int']>;
};

export type UpdateUserPictureInput = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  smallUrl?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  howHeard?: Maybe<Scalars['String']>;
  flags: Scalars['Int'];
  adminComments?: Maybe<Scalars['String']>;
  disabled: Scalars['Boolean'];
  disabledOn?: Maybe<Scalars['DateTime']>;
  nickname: Scalars['String'];
  userPictureId?: Maybe<Scalars['Int']>;
  disabledBy?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  dob?: Maybe<Scalars['String']>;
  active: Scalars['Boolean'];
  photo?: Maybe<UserPicture>;
  Contact: Array<Maybe<Contact>>;
  matches: Array<Maybe<PlayerMatchScore>>;
  tournamentsPlayed: Array<Maybe<PlayerTournamentScore>>;
  providers: Array<Maybe<Provider>>;
  Store: Array<Maybe<Store>>;
  tournamentsOwned: Array<Maybe<Tournament>>;
  Tournament: Array<Maybe<Tournament>>;
  UserRole: Array<Maybe<UserRole>>;
};

export type UserPicture = {
  __typename?: 'UserPicture';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  smallUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Array<Maybe<User>>;
  active?: Maybe<Scalars['Boolean']>;
};

export type UserRole = {
  __typename?: 'UserRole';
  id: Scalars['Int'];
  name: Scalars['String'];
  user?: Maybe<User>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Banner: ResolverTypeWrapper<Banner>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BannerCondition: BannerCondition;
  Contact: ResolverTypeWrapper<Contact>;
  CreateBannerInput: CreateBannerInput;
  CreateContactInput: CreateContactInput;
  CreateMatchInput: CreateMatchInput;
  CreatePlayerMatchScoreInput: CreatePlayerMatchScoreInput;
  CreatePlayerTournamentScoreInput: CreatePlayerTournamentScoreInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  CreateRoundInput: CreateRoundInput;
  CreateStoreInput: CreateStoreInput;
  CreateTournamentInput: CreateTournamentInput;
  CreateUserInput: CreateUserInput;
  CreateUserPictureInput: CreateUserPictureInput;
  CreateUserStoreInput: CreateUserStoreInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Match: ResolverTypeWrapper<Match>;
  MatchResult: MatchResult;
  MatchScore: MatchScore;
  Mutation: ResolverTypeWrapper<{}>;
  Placement: Placement;
  PlayerMatchScore: ResolverTypeWrapper<PlayerMatchScore>;
  PlayerTournamentScore: ResolverTypeWrapper<PlayerTournamentScore>;
  Provider: ResolverTypeWrapper<Provider>;
  Query: ResolverTypeWrapper<{}>;
  Redwood: ResolverTypeWrapper<Redwood>;
  Role: Role;
  Round: ResolverTypeWrapper<Round>;
  SearchTournamentInput: SearchTournamentInput;
  Store: ResolverTypeWrapper<Store>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  TimerInput: TimerInput;
  TimerStatus: TimerStatus;
  Tournament: ResolverTypeWrapper<Tournament>;
  TournamentMatchScoreInput: TournamentMatchScoreInput;
  UpdateBannerInput: UpdateBannerInput;
  UpdateContactInput: UpdateContactInput;
  UpdateMatchInput: UpdateMatchInput;
  UpdatePlayerMatchScoreInput: UpdatePlayerMatchScoreInput;
  UpdatePlayerTournamentScoreInput: UpdatePlayerTournamentScoreInput;
  UpdateRoundInput: UpdateRoundInput;
  UpdateStoreInput: UpdateStoreInput;
  UpdateTournamentInput: UpdateTournamentInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPictureInput: UpdateUserPictureInput;
  User: ResolverTypeWrapper<User>;
  UserPicture: ResolverTypeWrapper<UserPicture>;
  UserRole: ResolverTypeWrapper<UserRole>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Banner: Banner;
  Int: Scalars['Int'];
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Contact: Contact;
  CreateBannerInput: CreateBannerInput;
  CreateContactInput: CreateContactInput;
  CreateMatchInput: CreateMatchInput;
  CreatePlayerMatchScoreInput: CreatePlayerMatchScoreInput;
  CreatePlayerTournamentScoreInput: CreatePlayerTournamentScoreInput;
  Float: Scalars['Float'];
  CreateRoundInput: CreateRoundInput;
  CreateStoreInput: CreateStoreInput;
  CreateTournamentInput: CreateTournamentInput;
  CreateUserInput: CreateUserInput;
  CreateUserPictureInput: CreateUserPictureInput;
  CreateUserStoreInput: CreateUserStoreInput;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Match: Match;
  MatchScore: MatchScore;
  Mutation: {};
  PlayerMatchScore: PlayerMatchScore;
  PlayerTournamentScore: PlayerTournamentScore;
  Provider: Provider;
  Query: {};
  Redwood: Redwood;
  Round: Round;
  SearchTournamentInput: SearchTournamentInput;
  Store: Store;
  Time: Scalars['Time'];
  TimerInput: TimerInput;
  Tournament: Tournament;
  TournamentMatchScoreInput: TournamentMatchScoreInput;
  UpdateBannerInput: UpdateBannerInput;
  UpdateContactInput: UpdateContactInput;
  UpdateMatchInput: UpdateMatchInput;
  UpdatePlayerMatchScoreInput: UpdatePlayerMatchScoreInput;
  UpdatePlayerTournamentScoreInput: UpdatePlayerTournamentScoreInput;
  UpdateRoundInput: UpdateRoundInput;
  UpdateStoreInput: UpdateStoreInput;
  UpdateTournamentInput: UpdateTournamentInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPictureInput: UpdateUserPictureInput;
  User: User;
  UserPicture: UserPicture;
  UserRole: UserRole;
};

export type BannerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Banner'] = ResolversParentTypes['Banner']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  backgroundUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mainText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mainTextColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mainTextFontSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  subText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subTextColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subTextFontSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  textPlacement?: Resolver<Maybe<ResolversTypes['Placement']>, ParentType, ContextType>;
  button1Link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button1Text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button1BackgroundColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button1TextColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button2Link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button2Text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button2BackgroundColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button2TextColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  buttonsFontSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  buttonsVerticalPlacement?: Resolver<Maybe<ResolversTypes['Placement']>, ParentType, ContextType>;
  buttonsHorizontalPlacement?: Resolver<Maybe<ResolversTypes['Placement']>, ParentType, ContextType>;
  condition?: Resolver<Maybe<ResolversTypes['BannerCondition']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userContact?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MatchResolvers<ContextType = any, ParentType extends ResolversParentTypes['Match'] = ResolversParentTypes['Match']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  roundId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  tournamentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  tournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType>;
  players?: Resolver<Array<Maybe<ResolversTypes['PlayerMatchScore']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addMatchScore?: Resolver<ResolversTypes['Match'], ParentType, ContextType, RequireFields<MutationAddMatchScoreArgs, 'input'>>;
  advanceRound?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<MutationAdvanceRoundArgs, 'id' | 'roundNumber'>>;
  cancelTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationCancelTournamentArgs, 'id'>>;
  createBanner?: Resolver<ResolversTypes['Banner'], ParentType, ContextType, RequireFields<MutationCreateBannerArgs, 'input'>>;
  createContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationCreateContactArgs, 'input'>>;
  createRound?: Resolver<ResolversTypes['Round'], ParentType, ContextType, RequireFields<MutationCreateRoundArgs, 'input'>>;
  createStore?: Resolver<ResolversTypes['Store'], ParentType, ContextType, RequireFields<MutationCreateStoreArgs, 'input'>>;
  createTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationCreateTournamentArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  createUserPicture?: Resolver<ResolversTypes['UserPicture'], ParentType, ContextType, RequireFields<MutationCreateUserPictureArgs, 'input'>>;
  deleteBanner?: Resolver<ResolversTypes['Banner'], ParentType, ContextType, RequireFields<MutationDeleteBannerArgs, 'id'>>;
  deleteContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationDeleteContactArgs, 'id'>>;
  deleteRound?: Resolver<ResolversTypes['Round'], ParentType, ContextType, RequireFields<MutationDeleteRoundArgs, 'id'>>;
  deleteStore?: Resolver<ResolversTypes['Store'], ParentType, ContextType, RequireFields<MutationDeleteStoreArgs, 'id'>>;
  deleteTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationDeleteTournamentArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  deleteUserPicture?: Resolver<ResolversTypes['UserPicture'], ParentType, ContextType, RequireFields<MutationDeleteUserPictureArgs, 'id'>>;
  endTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationEndTournamentArgs, 'id'>>;
  registerForTournament?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRegisterForTournamentArgs, 'id'>>;
  startTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationStartTournamentArgs, 'id'>>;
  updateBanner?: Resolver<ResolversTypes['Banner'], ParentType, ContextType, RequireFields<MutationUpdateBannerArgs, 'id' | 'input'>>;
  updateContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationUpdateContactArgs, 'id' | 'input'>>;
  updateRound?: Resolver<ResolversTypes['Round'], ParentType, ContextType, RequireFields<MutationUpdateRoundArgs, 'id' | 'input'>>;
  updateStore?: Resolver<ResolversTypes['Store'], ParentType, ContextType, RequireFields<MutationUpdateStoreArgs, 'id' | 'input'>>;
  updateTimer?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationUpdateTimerArgs, 'input'>>;
  updateTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationUpdateTournamentArgs, 'id' | 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>;
  updateUserPicture?: Resolver<ResolversTypes['UserPicture'], ParentType, ContextType, RequireFields<MutationUpdateUserPictureArgs, 'id' | 'input'>>;
};

export type PlayerMatchScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerMatchScore'] = ResolversParentTypes['PlayerMatchScore']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bye?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  wonMatch?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  match?: Resolver<Maybe<ResolversTypes['Match']>, ParentType, ContextType>;
  matchId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerTournamentScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerTournamentScore'] = ResolversParentTypes['PlayerTournamentScore']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  wins?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  byes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  draws?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  losses?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalPoints?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalTournamentsPlayed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  wonTournament?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  playerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  player?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  tournamentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProviderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Provider'] = ResolversParentTypes['Provider']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  banner?: Resolver<Maybe<ResolversTypes['Banner']>, ParentType, ContextType, RequireFields<QueryBannerArgs, 'id'>>;
  banners?: Resolver<Array<ResolversTypes['Banner']>, ParentType, ContextType>;
  checkNickname?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckNicknameArgs, never>>;
  contact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<QueryContactArgs, 'id'>>;
  contacts?: Resolver<Array<ResolversTypes['Contact']>, ParentType, ContextType>;
  finishedTournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<QueryFinishedTournamentsArgs, never>>;
  homeBanners?: Resolver<Array<ResolversTypes['Banner']>, ParentType, ContextType>;
  matches?: Resolver<Array<ResolversTypes['Match']>, ParentType, ContextType>;
  myTournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType>;
  playerLeaderboard?: Resolver<Array<ResolversTypes['PlayerTournamentScore']>, ParentType, ContextType, RequireFields<QueryPlayerLeaderboardArgs, never>>;
  playerMatchScores?: Resolver<Array<ResolversTypes['PlayerMatchScore']>, ParentType, ContextType>;
  playerTournamentScores?: Resolver<Array<ResolversTypes['PlayerTournamentScore']>, ParentType, ContextType>;
  redwood?: Resolver<Maybe<ResolversTypes['Redwood']>, ParentType, ContextType>;
  round?: Resolver<Maybe<ResolversTypes['Round']>, ParentType, ContextType, RequireFields<QueryRoundArgs, 'id'>>;
  rounds?: Resolver<Array<ResolversTypes['Round']>, ParentType, ContextType>;
  searchTournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<QuerySearchTournamentsArgs, 'input'>>;
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<QueryStoreArgs, 'id'>>;
  stores?: Resolver<Array<ResolversTypes['Store']>, ParentType, ContextType>;
  tournament?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<QueryTournamentArgs, 'id'>>;
  tournamentByUrl?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<QueryTournamentByUrlArgs, never>>;
  tournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType>;
  upcomingTournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<QueryUpcomingTournamentsArgs, never>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userPicture?: Resolver<Maybe<ResolversTypes['UserPicture']>, ParentType, ContextType, RequireFields<QueryUserPictureArgs, 'id'>>;
  userPictures?: Resolver<Array<ResolversTypes['UserPicture']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RedwoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['Redwood'] = ResolversParentTypes['Redwood']> = {
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentUser?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  prismaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['Round'] = ResolversParentTypes['Round']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  tournamentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  roundNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startingTimerInSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  roundTimerLeftInSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType>;
  matches?: Resolver<Array<Maybe<ResolversTypes['Match']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tournaments?: Resolver<Array<Maybe<ResolversTypes['Tournament']>>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  street1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zip?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  distributor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  approved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  approvedOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type TournamentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tournament'] = ResolversParentTypes['Tournament']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  desc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tournamentUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  distance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  playerCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dateStarted?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  dateEnded?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  maxPlayers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  locationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  infoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startingTimerInSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timerLeftInSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timerStatus?: Resolver<Maybe<ResolversTypes['TimerStatus']>, ParentType, ContextType>;
  timerLastUpdated?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  storeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  matches?: Resolver<Array<Maybe<ResolversTypes['Match']>>, ParentType, ContextType>;
  players?: Resolver<Array<Maybe<ResolversTypes['PlayerTournamentScore']>>, ParentType, ContextType>;
  winners?: Resolver<Maybe<Array<Maybe<ResolversTypes['PlayerTournamentScore']>>>, ParentType, ContextType>;
  round?: Resolver<Array<Maybe<ResolversTypes['Round']>>, ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  howHeard?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  flags?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  adminComments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  disabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  disabledOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userPictureId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  disabledBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dob?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  photo?: Resolver<Maybe<ResolversTypes['UserPicture']>, ParentType, ContextType>;
  Contact?: Resolver<Array<Maybe<ResolversTypes['Contact']>>, ParentType, ContextType>;
  matches?: Resolver<Array<Maybe<ResolversTypes['PlayerMatchScore']>>, ParentType, ContextType>;
  tournamentsPlayed?: Resolver<Array<Maybe<ResolversTypes['PlayerTournamentScore']>>, ParentType, ContextType>;
  providers?: Resolver<Array<Maybe<ResolversTypes['Provider']>>, ParentType, ContextType>;
  Store?: Resolver<Array<Maybe<ResolversTypes['Store']>>, ParentType, ContextType>;
  tournamentsOwned?: Resolver<Array<Maybe<ResolversTypes['Tournament']>>, ParentType, ContextType>;
  Tournament?: Resolver<Array<Maybe<ResolversTypes['Tournament']>>, ParentType, ContextType>;
  UserRole?: Resolver<Array<Maybe<ResolversTypes['UserRole']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPictureResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPicture'] = ResolversParentTypes['UserPicture']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  smallUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRole'] = ResolversParentTypes['UserRole']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Banner?: BannerResolvers<ContextType>;
  Contact?: ContactResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Match?: MatchResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PlayerMatchScore?: PlayerMatchScoreResolvers<ContextType>;
  PlayerTournamentScore?: PlayerTournamentScoreResolvers<ContextType>;
  Provider?: ProviderResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Redwood?: RedwoodResolvers<ContextType>;
  Round?: RoundResolvers<ContextType>;
  Store?: StoreResolvers<ContextType>;
  Time?: GraphQLScalarType;
  Tournament?: TournamentResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserPicture?: UserPictureResolvers<ContextType>;
  UserRole?: UserRoleResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
