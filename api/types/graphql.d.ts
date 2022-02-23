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

export type AddPlayerInput = {
  byes?: Maybe<Scalars['Int']>;
  draws?: Maybe<Scalars['Int']>;
  losses?: Maybe<Scalars['Int']>;
  playerId?: Maybe<Scalars['String']>;
  playerName: Scalars['String'];
  score?: Maybe<Scalars['Float']>;
  wins?: Maybe<Scalars['Int']>;
};

export type Banner = {
  __typename?: 'Banner';
  active: Scalars['Boolean'];
  backgroundUrl: Scalars['String'];
  button1BackgroundColor?: Maybe<Scalars['String']>;
  button1Link?: Maybe<Scalars['String']>;
  button1Text?: Maybe<Scalars['String']>;
  button1TextColor?: Maybe<Scalars['String']>;
  button2BackgroundColor?: Maybe<Scalars['String']>;
  button2Link?: Maybe<Scalars['String']>;
  button2Text?: Maybe<Scalars['String']>;
  button2TextColor?: Maybe<Scalars['String']>;
  buttonsFontSize?: Maybe<Scalars['Int']>;
  buttonsHorizontalPlacement?: Maybe<Placement>;
  buttonsVerticalPlacement?: Maybe<Placement>;
  condition?: Maybe<BannerCondition>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  mainText?: Maybe<Scalars['String']>;
  mainTextColor?: Maybe<Scalars['String']>;
  mainTextFontSize?: Maybe<Scalars['Int']>;
  subText?: Maybe<Scalars['String']>;
  subTextColor?: Maybe<Scalars['String']>;
  subTextFontSize?: Maybe<Scalars['Int']>;
  textPlacement?: Maybe<Placement>;
  updatedAt: Scalars['DateTime'];
};

export type BannerCondition =
  | 'ALL'
  | 'EO'
  | 'GUEST'
  | 'LOGGEDIN'
  | 'PLAYER';

export type Contact = {
  __typename?: 'Contact';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userContact?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type CreateBannerInput = {
  active: Scalars['Boolean'];
  backgroundUrl: Scalars['String'];
  button1BackgroundColor?: Maybe<Scalars['String']>;
  button1Link?: Maybe<Scalars['String']>;
  button1Text?: Maybe<Scalars['String']>;
  button1TextColor?: Maybe<Scalars['String']>;
  button2BackgroundColor?: Maybe<Scalars['String']>;
  button2Link?: Maybe<Scalars['String']>;
  button2Text?: Maybe<Scalars['String']>;
  button2TextColor?: Maybe<Scalars['String']>;
  buttonsFontSize?: Maybe<Scalars['Int']>;
  buttonsHorizontalPlacement?: Maybe<Placement>;
  buttonsVerticalPlacement?: Maybe<Placement>;
  condition?: Maybe<BannerCondition>;
  mainText?: Maybe<Scalars['String']>;
  mainTextColor?: Maybe<Scalars['String']>;
  mainTextFontSize?: Maybe<Scalars['Int']>;
  subText?: Maybe<Scalars['String']>;
  subTextColor?: Maybe<Scalars['String']>;
  subTextFontSize?: Maybe<Scalars['Int']>;
  textPlacement?: Maybe<Placement>;
};

export type CreateContactInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  text: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
};

export type CreateMatchInput = {
  active: Scalars['Boolean'];
  roundId: Scalars['Int'];
  tournamentId: Scalars['Int'];
};

export type CreatePlayerMatchScoreInput = {
  active: Scalars['Boolean'];
  bye: Scalars['Boolean'];
  matchId: Scalars['Int'];
  playerName?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
  wonMatch: Scalars['Boolean'];
};

export type CreatePlayerTournamentScoreInput = {
  active: Scalars['Boolean'];
  byes: Scalars['Int'];
  draws: Scalars['Int'];
  losses: Scalars['Int'];
  playerId?: Maybe<Scalars['String']>;
  playerName?: Maybe<Scalars['String']>;
  score: Scalars['Float'];
  tournamentId: Scalars['Int'];
  wins: Scalars['Int'];
  wonTournament: Scalars['Boolean'];
};

export type CreateRoundInput = {
  active: Scalars['Boolean'];
  roundNumber: Scalars['Int'];
  roundTimerLeftInSeconds?: Maybe<Scalars['Int']>;
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  tournamentId: Scalars['Int'];
};

export type CreateStoreInput = {
  approved?: Maybe<Scalars['Boolean']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  city: Scalars['String'];
  country: Scalars['String'];
  distributor: Scalars['String'];
  email: Scalars['String'];
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  ownerId: Scalars['String'];
  phone: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  zip: Scalars['String'];
};

export type CreateTournamentInput = {
  active?: Maybe<Scalars['Boolean']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  dateEnded?: Maybe<Scalars['DateTime']>;
  dateStarted?: Maybe<Scalars['DateTime']>;
  desc?: Maybe<Scalars['String']>;
  infoUrl?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  locationName: Scalars['String'];
  maxPlayers: Scalars['Int'];
  name: Scalars['String'];
  ownerId?: Maybe<Scalars['String']>;
  publicRegistration?: Maybe<Scalars['Boolean']>;
  startDate: Scalars['DateTime'];
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  timerLastUpdated?: Maybe<Scalars['DateTime']>;
  timerLeftInSeconds?: Maybe<Scalars['Int']>;
  timerStatus?: Maybe<TimerStatus>;
  tournamentUrl?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type CreateTournamentMatchInput = {
  proposedMatch: Array<Scalars['Int']>;
  roundId: Scalars['Int'];
  tournamentId: Scalars['Int'];
};

export type CreateUserInput = {
  active?: Maybe<Scalars['Boolean']>;
  adminComments?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  disabledBy?: Maybe<Scalars['String']>;
  disabledOn?: Maybe<Scalars['DateTime']>;
  dob?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['Int']>;
  gender?: Maybe<Scalars['String']>;
  howHeard?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['Int']>;
  lastname?: Maybe<Scalars['String']>;
  nickname: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  state?: Maybe<Scalars['String']>;
  userPictureId?: Maybe<Scalars['Int']>;
  zip?: Maybe<Scalars['String']>;
};

export type CreateUserPictureInput = {
  active?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  smallUrl?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type CreateUserStoreInput = {
  city: Scalars['String'];
  country: Scalars['String'];
  distributor: Scalars['String'];
  email: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  name: Scalars['String'];
  phone: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
  zip: Scalars['String'];
};

export type CreateUserUserRoleInput = {
  active: Scalars['Boolean'];
  userId: Scalars['String'];
  userRoleId: Scalars['Int'];
};

export type Match = {
  __typename?: 'Match';
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  players: Array<Maybe<PlayerMatchScore>>;
  round: Round;
  roundId: Scalars['Int'];
  tournament: Tournament;
  tournamentId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type MatchResult =
  | 'LOSS'
  | 'TIED'
  | 'WIN';

export type MatchScore = {
  playerMatchScoreId?: Maybe<Scalars['Int']>;
  playerName?: Maybe<Scalars['String']>;
  previousBye?: Maybe<Scalars['Boolean']>;
  result?: Maybe<MatchResult>;
  score?: Maybe<Scalars['Int']>;
  updatedPlayerName?: Maybe<Scalars['String']>;
  updatedUserId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMatchScore: Tournament;
  addPlayer: Tournament;
  advanceRound?: Maybe<Tournament>;
  cancelTournament: Tournament;
  createBanner: Banner;
  createContact: Contact;
  createMatch: Match;
  createPlayerMatchScore: PlayerMatchScore;
  createPlayerTournamentScore: PlayerTournamentScore;
  createRound: Round;
  createStore: Store;
  createTournament: Tournament;
  createTournamentMatch: Tournament;
  createUser: User;
  createUserPicture: UserPicture;
  createUserUserRole: UserUserRole;
  deleteBanner: Banner;
  deleteContact: Contact;
  deleteMatch: Match;
  deletePlayerMatchScore: PlayerMatchScore;
  deletePlayerTournamentScore: PlayerTournamentScore;
  deleteRound: Round;
  deleteStore: Store;
  deleteTournament: Tournament;
  deleteTournamentMatch: Tournament;
  deleteUser: User;
  deleteUserPicture: UserPicture;
  deleteUserUserRole: UserUserRole;
  endTournament: Tournament;
  leaveTournament: Scalars['String'];
  registerForTournament: Scalars['String'];
  removePlayer: Scalars['String'];
  seedSingleTournament?: Maybe<Tournament>;
  seedTournaments: Array<Maybe<Tournament>>;
  startTournament: Tournament;
  updateBanner: Banner;
  updateContact: Contact;
  updateMatch: Match;
  updateMatchScore: Tournament;
  updatePlayerMatchScore: PlayerMatchScore;
  updatePlayerTournamentScore: PlayerTournamentScore;
  updateRound: Round;
  updateStore: Store;
  updateTimer: Tournament;
  updateTournament: Tournament;
  updateUser: User;
  updateUserPicture: UserPicture;
  updateUserUserRole: UserUserRole;
};


export type MutationAddMatchScoreArgs = {
  input: TournamentMatchScoreInput;
};


export type MutationAddPlayerArgs = {
  id: Scalars['Int'];
  input: AddPlayerInput;
};


export type MutationAdvanceRoundArgs = {
  id: Scalars['Int'];
  roundNumber: Scalars['Int'];
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


export type MutationCreateMatchArgs = {
  input: CreateMatchInput;
};


export type MutationCreatePlayerMatchScoreArgs = {
  input: CreatePlayerMatchScoreInput;
};


export type MutationCreatePlayerTournamentScoreArgs = {
  input: CreatePlayerTournamentScoreInput;
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


export type MutationCreateTournamentMatchArgs = {
  input: CreateTournamentMatchInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
  storeInput?: Maybe<CreateUserStoreInput>;
};


export type MutationCreateUserPictureArgs = {
  input: CreateUserPictureInput;
};


export type MutationCreateUserUserRoleArgs = {
  input: CreateUserUserRoleInput;
};


export type MutationDeleteBannerArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteContactArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteMatchArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePlayerMatchScoreArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePlayerTournamentScoreArgs = {
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


export type MutationDeleteTournamentMatchArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserPictureArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserUserRoleArgs = {
  id: Scalars['Int'];
};


export type MutationEndTournamentArgs = {
  id: Scalars['Int'];
};


export type MutationLeaveTournamentArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterForTournamentArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePlayerArgs = {
  id: Scalars['Int'];
};


export type MutationSeedSingleTournamentArgs = {
  id: Scalars['Int'];
  numPlayers?: Maybe<Scalars['Int']>;
};


export type MutationSeedTournamentsArgs = {
  country?: Maybe<Scalars['String']>;
  numTournaments?: Maybe<Scalars['Int']>;
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


export type MutationUpdateMatchArgs = {
  id: Scalars['Int'];
  input: UpdateMatchInput;
};


export type MutationUpdateMatchScoreArgs = {
  input: TournamentMatchScoreInput;
};


export type MutationUpdatePlayerMatchScoreArgs = {
  id: Scalars['Int'];
  input: UpdatePlayerMatchScoreInput;
};


export type MutationUpdatePlayerTournamentScoreArgs = {
  id: Scalars['Int'];
  input: UpdatePlayerTournamentScoreInput;
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


export type MutationUpdateUserUserRoleArgs = {
  id: Scalars['Int'];
  input: UpdateUserUserRoleInput;
};

export type OrderByInput = {
  orderByDirection?: Maybe<Scalars['String']>;
  orderByKey?: Maybe<Scalars['String']>;
};

export type PaginatedLeaderboard = {
  __typename?: 'PaginatedLeaderboard';
  leaderboard: Array<PlayerTournamentScore>;
  more?: Maybe<Scalars['Boolean']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PaginatedTournaments = {
  __typename?: 'PaginatedTournaments';
  more?: Maybe<Scalars['Boolean']>;
  totalCount?: Maybe<Scalars['Int']>;
  tournaments: Array<Tournament>;
};

export type Placement =
  | 'center'
  | 'end'
  | 'start';

export type PlayerMatchScore = {
  __typename?: 'PlayerMatchScore';
  active: Scalars['Boolean'];
  bye: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  match: Match;
  matchId: Scalars['Int'];
  playerName?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  wonMatch: Scalars['Boolean'];
};

export type PlayerTournamentScore = {
  __typename?: 'PlayerTournamentScore';
  active: Scalars['Boolean'];
  byes: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  draws: Scalars['Int'];
  id?: Maybe<Scalars['Int']>;
  losses: Scalars['Int'];
  player?: Maybe<User>;
  playerId?: Maybe<Scalars['String']>;
  playerName?: Maybe<Scalars['String']>;
  rank?: Maybe<Scalars['Int']>;
  score: Scalars['Float'];
  totalPoints?: Maybe<Scalars['Float']>;
  totalScore?: Maybe<Scalars['Float']>;
  totalTournamentsPlayed?: Maybe<Scalars['Int']>;
  tournament: Tournament;
  tournamentId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  wins: Scalars['Int'];
  wonTournament: Scalars['Boolean'];
};

export type Provider = {
  __typename?: 'Provider';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  uuid: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  activeStores: Array<Store>;
  banner?: Maybe<Banner>;
  banners: Array<Banner>;
  checkNickname: Scalars['Boolean'];
  contact?: Maybe<Contact>;
  contacts: Array<Contact>;
  currentTournaments: Array<Tournament>;
  finishedTournaments: Array<Tournament>;
  homeBanners: Array<Banner>;
  match?: Maybe<Match>;
  matches: Array<Match>;
  myTournaments: Array<Tournament>;
  playerLeaderboard?: Maybe<PaginatedLeaderboard>;
  playerMatchScore?: Maybe<PlayerMatchScore>;
  playerMatchScores: Array<PlayerMatchScore>;
  playerTournamentScore?: Maybe<PlayerTournamentScore>;
  playerTournamentScores: Array<PlayerTournamentScore>;
  redwood?: Maybe<Redwood>;
  round?: Maybe<Round>;
  rounds: Array<Round>;
  searchNonPlayers: Array<User>;
  searchTournaments: PaginatedTournaments;
  store?: Maybe<Store>;
  stores: Array<Store>;
  tournament?: Maybe<Tournament>;
  tournamentByUrl?: Maybe<Tournament>;
  tournamentPlayers?: Maybe<Array<PlayerTournamentScore>>;
  tournaments: Array<Tournament>;
  upcomingTournaments: Array<Tournament>;
  user?: Maybe<User>;
  userPicture?: Maybe<UserPicture>;
  userPictures: Array<UserPicture>;
  userUserRole?: Maybe<UserUserRole>;
  userUserRoles: Array<UserUserRole>;
  users: Array<User>;
};


export type QueryActiveStoresArgs = {
  searchTerm?: Maybe<Scalars['String']>;
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


export type QueryCurrentTournamentsArgs = {
  input?: Maybe<SearchTournamentInput>;
};


export type QueryFinishedTournamentsArgs = {
  input?: Maybe<SearchTournamentInput>;
};


export type QueryMatchArgs = {
  id: Scalars['Int'];
};


export type QueryPlayerLeaderboardArgs = {
  nicknameSearch?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryPlayerMatchScoreArgs = {
  id: Scalars['Int'];
};


export type QueryPlayerTournamentScoreArgs = {
  id: Scalars['Int'];
};


export type QueryRoundArgs = {
  id: Scalars['Int'];
};


export type QuerySearchNonPlayersArgs = {
  id: Scalars['Int'];
  searchTerm?: Maybe<Scalars['String']>;
};


export type QuerySearchTournamentsArgs = {
  input: SearchTournamentInput;
};


export type QueryStoreArgs = {
  id: Scalars['String'];
};


export type QueryStoresArgs = {
  searchTerm?: Maybe<Scalars['String']>;
};


export type QueryTournamentArgs = {
  id: Scalars['Int'];
};


export type QueryTournamentByUrlArgs = {
  url?: Maybe<Scalars['String']>;
};


export type QueryTournamentPlayersArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};


export type QueryTournamentsArgs = {
  orderBy?: Maybe<OrderByInput>;
  searchTerm?: Maybe<Scalars['String']>;
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


export type QueryUserUserRoleArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  searchTerm?: Maybe<Scalars['String']>;
};

export type Redwood = {
  __typename?: 'Redwood';
  currentUser?: Maybe<Scalars['JSON']>;
  prismaVersion?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type Role =
  | 'EO'
  | 'PLAYER';

export type Round = {
  __typename?: 'Round';
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  matches: Array<Maybe<Match>>;
  roundNumber: Scalars['Int'];
  roundTimerLeftInSeconds?: Maybe<Scalars['Int']>;
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  tournament: Tournament;
  tournamentId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type SearchTournamentInput = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  dateEnd?: Maybe<Scalars['Date']>;
  dateStart?: Maybe<Scalars['Date']>;
  distance?: Maybe<Scalars['Int']>;
  finishedTournaments?: Maybe<Scalars['Boolean']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  openSpotsOnly?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  store?: Maybe<Scalars['String']>;
  take?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type Store = {
  __typename?: 'Store';
  approved?: Maybe<Scalars['Boolean']>;
  approvedBy?: Maybe<User>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  approverId?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  distributor: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  owner: User;
  ownerId: Scalars['String'];
  phone: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  tournaments: Array<Maybe<Tournament>>;
  zip: Scalars['String'];
};

export type TimerInput = {
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  timerLeftInSeconds?: Maybe<Scalars['Int']>;
  timerStatus: TimerStatus;
  tournamentId: Scalars['Int'];
};

export type TimerStatus =
  | 'INPROGRESS'
  | 'PAUSED'
  | 'PENDING'
  | 'STOPPED';

export type Tournament = {
  __typename?: 'Tournament';
  active: Scalars['Boolean'];
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dateEnded?: Maybe<Scalars['DateTime']>;
  dateStarted?: Maybe<Scalars['DateTime']>;
  desc?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  infoUrl?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  locationName: Scalars['String'];
  matches: Array<Maybe<Match>>;
  maxPlayers: Scalars['Int'];
  name: Scalars['String'];
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['String']>;
  playerCount?: Maybe<Scalars['Int']>;
  players: Array<Maybe<PlayerTournamentScore>>;
  publicRegistration?: Maybe<Scalars['Boolean']>;
  round: Array<Maybe<Round>>;
  startDate: Scalars['DateTime'];
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  store?: Maybe<Store>;
  storeId?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  timerLastUpdated?: Maybe<Scalars['DateTime']>;
  timerLeftInSeconds?: Maybe<Scalars['Int']>;
  timerStatus?: Maybe<TimerStatus>;
  tournamentUrl: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  winners?: Maybe<Array<Maybe<PlayerTournamentScore>>>;
  zip?: Maybe<Scalars['String']>;
};

export type TournamentMatchScoreInput = {
  matchId: Scalars['Int'];
  matches: Array<Maybe<MatchScore>>;
};

export type UpdateBannerInput = {
  active?: Maybe<Scalars['Boolean']>;
  backgroundUrl?: Maybe<Scalars['String']>;
  button1BackgroundColor?: Maybe<Scalars['String']>;
  button1Link?: Maybe<Scalars['String']>;
  button1Text?: Maybe<Scalars['String']>;
  button1TextColor?: Maybe<Scalars['String']>;
  button2BackgroundColor?: Maybe<Scalars['String']>;
  button2Link?: Maybe<Scalars['String']>;
  button2Text?: Maybe<Scalars['String']>;
  button2TextColor?: Maybe<Scalars['String']>;
  buttonsFontSize?: Maybe<Scalars['Int']>;
  buttonsHorizontalPlacement?: Maybe<Placement>;
  buttonsVerticalPlacement?: Maybe<Placement>;
  condition?: Maybe<BannerCondition>;
  mainText?: Maybe<Scalars['String']>;
  mainTextColor?: Maybe<Scalars['String']>;
  mainTextFontSize?: Maybe<Scalars['Int']>;
  subText?: Maybe<Scalars['String']>;
  subTextColor?: Maybe<Scalars['String']>;
  subTextFontSize?: Maybe<Scalars['Int']>;
  textPlacement?: Maybe<Placement>;
};

export type UpdateContactInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type UpdateMatchInput = {
  active?: Maybe<Scalars['Boolean']>;
  roundId?: Maybe<Scalars['Int']>;
  tournamentId?: Maybe<Scalars['Int']>;
};

export type UpdatePlayerMatchScoreInput = {
  active?: Maybe<Scalars['Boolean']>;
  bye?: Maybe<Scalars['Boolean']>;
  matchId?: Maybe<Scalars['Int']>;
  playerName?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
  wonMatch?: Maybe<Scalars['Boolean']>;
};

export type UpdatePlayerTournamentScoreInput = {
  active?: Maybe<Scalars['Boolean']>;
  byes?: Maybe<Scalars['Int']>;
  draws?: Maybe<Scalars['Int']>;
  losses?: Maybe<Scalars['Int']>;
  playerId?: Maybe<Scalars['String']>;
  playerName?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
  tournamentId?: Maybe<Scalars['Int']>;
  wins?: Maybe<Scalars['Int']>;
  wonTournament?: Maybe<Scalars['Boolean']>;
};

export type UpdateRoundInput = {
  active?: Maybe<Scalars['Boolean']>;
  roundNumber?: Maybe<Scalars['Int']>;
  roundTimerLeftInSeconds?: Maybe<Scalars['Int']>;
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  tournamentId?: Maybe<Scalars['Int']>;
};

export type UpdateStoreInput = {
  approved?: Maybe<Scalars['Boolean']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  distributor?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type UpdateTournamentInput = {
  active?: Maybe<Scalars['Boolean']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  dateEnded?: Maybe<Scalars['DateTime']>;
  dateStarted?: Maybe<Scalars['DateTime']>;
  desc?: Maybe<Scalars['String']>;
  infoUrl?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  locationName?: Maybe<Scalars['String']>;
  maxPlayers?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  publicRegistration?: Maybe<Scalars['Boolean']>;
  startDate?: Maybe<Scalars['DateTime']>;
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  timerLastUpdated?: Maybe<Scalars['DateTime']>;
  timerLeftInSeconds?: Maybe<Scalars['Int']>;
  timerStatus?: Maybe<TimerStatus>;
  tournamentUrl?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  active?: Maybe<Scalars['Boolean']>;
  adminComments?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  disabledBy?: Maybe<Scalars['String']>;
  disabledOn?: Maybe<Scalars['DateTime']>;
  dob?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  flags?: Maybe<Scalars['Int']>;
  gender?: Maybe<Scalars['String']>;
  howHeard?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['Int']>;
  lastname?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  userPictureId?: Maybe<Scalars['Int']>;
  zip?: Maybe<Scalars['String']>;
};

export type UpdateUserPictureInput = {
  active?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  smallUrl?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type UpdateUserUserRoleInput = {
  active?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['String']>;
  userRoleId?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  Contact: Array<Maybe<Contact>>;
  Store: Array<Maybe<Store>>;
  Tournament: Array<Maybe<Tournament>>;
  UserUserRole: Array<Maybe<UserUserRole>>;
  active: Scalars['Boolean'];
  adminComments?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  disabled: Scalars['Boolean'];
  disabledBy?: Maybe<Scalars['String']>;
  disabledOn?: Maybe<Scalars['DateTime']>;
  dob?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  flags: Scalars['Int'];
  gender?: Maybe<Scalars['String']>;
  howHeard?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastname?: Maybe<Scalars['String']>;
  matches: Array<Maybe<PlayerMatchScore>>;
  nickname: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<UserPicture>;
  providers: Array<Maybe<Provider>>;
  state?: Maybe<Scalars['String']>;
  tournamentsOwned: Array<Maybe<Tournament>>;
  tournamentsPlayed: Array<Maybe<PlayerTournamentScore>>;
  updatedAt: Scalars['DateTime'];
  userPictureId?: Maybe<Scalars['Int']>;
  zip?: Maybe<Scalars['String']>;
};

export type UserPicture = {
  __typename?: 'UserPicture';
  active?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  smallUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  user: Array<Maybe<User>>;
};

export type UserRole = {
  __typename?: 'UserRole';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type UserUserRole = {
  __typename?: 'UserUserRole';
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
  userRole: UserRole;
  userRoleId: Scalars['Int'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
  AddPlayerInput: AddPlayerInput;
  Banner: ResolverTypeWrapper<Banner>;
  BannerCondition: BannerCondition;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Contact: ResolverTypeWrapper<Contact>;
  CreateBannerInput: CreateBannerInput;
  CreateContactInput: CreateContactInput;
  CreateMatchInput: CreateMatchInput;
  CreatePlayerMatchScoreInput: CreatePlayerMatchScoreInput;
  CreatePlayerTournamentScoreInput: CreatePlayerTournamentScoreInput;
  CreateRoundInput: CreateRoundInput;
  CreateStoreInput: CreateStoreInput;
  CreateTournamentInput: CreateTournamentInput;
  CreateTournamentMatchInput: CreateTournamentMatchInput;
  CreateUserInput: CreateUserInput;
  CreateUserPictureInput: CreateUserPictureInput;
  CreateUserStoreInput: CreateUserStoreInput;
  CreateUserUserRoleInput: CreateUserUserRoleInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Match: ResolverTypeWrapper<Match>;
  MatchResult: MatchResult;
  MatchScore: MatchScore;
  Mutation: ResolverTypeWrapper<{}>;
  OrderByInput: OrderByInput;
  PaginatedLeaderboard: ResolverTypeWrapper<PaginatedLeaderboard>;
  PaginatedTournaments: ResolverTypeWrapper<PaginatedTournaments>;
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
  String: ResolverTypeWrapper<Scalars['String']>;
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
  UpdateUserUserRoleInput: UpdateUserUserRoleInput;
  User: ResolverTypeWrapper<User>;
  UserPicture: ResolverTypeWrapper<UserPicture>;
  UserRole: ResolverTypeWrapper<UserRole>;
  UserUserRole: ResolverTypeWrapper<UserUserRole>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddPlayerInput: AddPlayerInput;
  Banner: Banner;
  Boolean: Scalars['Boolean'];
  Contact: Contact;
  CreateBannerInput: CreateBannerInput;
  CreateContactInput: CreateContactInput;
  CreateMatchInput: CreateMatchInput;
  CreatePlayerMatchScoreInput: CreatePlayerMatchScoreInput;
  CreatePlayerTournamentScoreInput: CreatePlayerTournamentScoreInput;
  CreateRoundInput: CreateRoundInput;
  CreateStoreInput: CreateStoreInput;
  CreateTournamentInput: CreateTournamentInput;
  CreateTournamentMatchInput: CreateTournamentMatchInput;
  CreateUserInput: CreateUserInput;
  CreateUserPictureInput: CreateUserPictureInput;
  CreateUserStoreInput: CreateUserStoreInput;
  CreateUserUserRoleInput: CreateUserUserRoleInput;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Match: Match;
  MatchScore: MatchScore;
  Mutation: {};
  OrderByInput: OrderByInput;
  PaginatedLeaderboard: PaginatedLeaderboard;
  PaginatedTournaments: PaginatedTournaments;
  PlayerMatchScore: PlayerMatchScore;
  PlayerTournamentScore: PlayerTournamentScore;
  Provider: Provider;
  Query: {};
  Redwood: Redwood;
  Round: Round;
  SearchTournamentInput: SearchTournamentInput;
  Store: Store;
  String: Scalars['String'];
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
  UpdateUserUserRoleInput: UpdateUserUserRoleInput;
  User: User;
  UserPicture: UserPicture;
  UserRole: UserRole;
  UserUserRole: UserUserRole;
};

export type AdminOnlyDirectiveArgs = { };

export type AdminOnlyDirectiveResolver<Result, Parent, ContextType = any, Args = AdminOnlyDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RequireAuthDirectiveArgs = {
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type RequireAuthDirectiveResolver<Result, Parent, ContextType = any, Args = RequireAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SkipAuthDirectiveArgs = { };

export type SkipAuthDirectiveResolver<Result, Parent, ContextType = any, Args = SkipAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BannerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Banner'] = ResolversParentTypes['Banner']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  backgroundUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  button1BackgroundColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button1Link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button1Text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button1TextColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button2BackgroundColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button2Link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button2Text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button2TextColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  buttonsFontSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  buttonsHorizontalPlacement?: Resolver<Maybe<ResolversTypes['Placement']>, ParentType, ContextType>;
  buttonsVerticalPlacement?: Resolver<Maybe<ResolversTypes['Placement']>, ParentType, ContextType>;
  condition?: Resolver<Maybe<ResolversTypes['BannerCondition']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mainText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mainTextColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mainTextFontSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  subText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subTextColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subTextFontSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  textPlacement?: Resolver<Maybe<ResolversTypes['Placement']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userContact?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  players?: Resolver<Array<Maybe<ResolversTypes['PlayerMatchScore']>>, ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  roundId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType>;
  tournamentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addMatchScore?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationAddMatchScoreArgs, 'input'>>;
  addPlayer?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationAddPlayerArgs, 'id' | 'input'>>;
  advanceRound?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<MutationAdvanceRoundArgs, 'id' | 'roundNumber'>>;
  cancelTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationCancelTournamentArgs, 'id'>>;
  createBanner?: Resolver<ResolversTypes['Banner'], ParentType, ContextType, RequireFields<MutationCreateBannerArgs, 'input'>>;
  createContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationCreateContactArgs, 'input'>>;
  createMatch?: Resolver<ResolversTypes['Match'], ParentType, ContextType, RequireFields<MutationCreateMatchArgs, 'input'>>;
  createPlayerMatchScore?: Resolver<ResolversTypes['PlayerMatchScore'], ParentType, ContextType, RequireFields<MutationCreatePlayerMatchScoreArgs, 'input'>>;
  createPlayerTournamentScore?: Resolver<ResolversTypes['PlayerTournamentScore'], ParentType, ContextType, RequireFields<MutationCreatePlayerTournamentScoreArgs, 'input'>>;
  createRound?: Resolver<ResolversTypes['Round'], ParentType, ContextType, RequireFields<MutationCreateRoundArgs, 'input'>>;
  createStore?: Resolver<ResolversTypes['Store'], ParentType, ContextType, RequireFields<MutationCreateStoreArgs, 'input'>>;
  createTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationCreateTournamentArgs, 'input'>>;
  createTournamentMatch?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationCreateTournamentMatchArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  createUserPicture?: Resolver<ResolversTypes['UserPicture'], ParentType, ContextType, RequireFields<MutationCreateUserPictureArgs, 'input'>>;
  createUserUserRole?: Resolver<ResolversTypes['UserUserRole'], ParentType, ContextType, RequireFields<MutationCreateUserUserRoleArgs, 'input'>>;
  deleteBanner?: Resolver<ResolversTypes['Banner'], ParentType, ContextType, RequireFields<MutationDeleteBannerArgs, 'id'>>;
  deleteContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationDeleteContactArgs, 'id'>>;
  deleteMatch?: Resolver<ResolversTypes['Match'], ParentType, ContextType, RequireFields<MutationDeleteMatchArgs, 'id'>>;
  deletePlayerMatchScore?: Resolver<ResolversTypes['PlayerMatchScore'], ParentType, ContextType, RequireFields<MutationDeletePlayerMatchScoreArgs, 'id'>>;
  deletePlayerTournamentScore?: Resolver<ResolversTypes['PlayerTournamentScore'], ParentType, ContextType, RequireFields<MutationDeletePlayerTournamentScoreArgs, 'id'>>;
  deleteRound?: Resolver<ResolversTypes['Round'], ParentType, ContextType, RequireFields<MutationDeleteRoundArgs, 'id'>>;
  deleteStore?: Resolver<ResolversTypes['Store'], ParentType, ContextType, RequireFields<MutationDeleteStoreArgs, 'id'>>;
  deleteTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationDeleteTournamentArgs, 'id'>>;
  deleteTournamentMatch?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationDeleteTournamentMatchArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  deleteUserPicture?: Resolver<ResolversTypes['UserPicture'], ParentType, ContextType, RequireFields<MutationDeleteUserPictureArgs, 'id'>>;
  deleteUserUserRole?: Resolver<ResolversTypes['UserUserRole'], ParentType, ContextType, RequireFields<MutationDeleteUserUserRoleArgs, 'id'>>;
  endTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationEndTournamentArgs, 'id'>>;
  leaveTournament?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationLeaveTournamentArgs, 'id'>>;
  registerForTournament?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRegisterForTournamentArgs, 'id'>>;
  removePlayer?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRemovePlayerArgs, 'id'>>;
  seedSingleTournament?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<MutationSeedSingleTournamentArgs, 'id'>>;
  seedTournaments?: Resolver<Array<Maybe<ResolversTypes['Tournament']>>, ParentType, ContextType, RequireFields<MutationSeedTournamentsArgs, never>>;
  startTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationStartTournamentArgs, 'id'>>;
  updateBanner?: Resolver<ResolversTypes['Banner'], ParentType, ContextType, RequireFields<MutationUpdateBannerArgs, 'id' | 'input'>>;
  updateContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationUpdateContactArgs, 'id' | 'input'>>;
  updateMatch?: Resolver<ResolversTypes['Match'], ParentType, ContextType, RequireFields<MutationUpdateMatchArgs, 'id' | 'input'>>;
  updateMatchScore?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationUpdateMatchScoreArgs, 'input'>>;
  updatePlayerMatchScore?: Resolver<ResolversTypes['PlayerMatchScore'], ParentType, ContextType, RequireFields<MutationUpdatePlayerMatchScoreArgs, 'id' | 'input'>>;
  updatePlayerTournamentScore?: Resolver<ResolversTypes['PlayerTournamentScore'], ParentType, ContextType, RequireFields<MutationUpdatePlayerTournamentScoreArgs, 'id' | 'input'>>;
  updateRound?: Resolver<ResolversTypes['Round'], ParentType, ContextType, RequireFields<MutationUpdateRoundArgs, 'id' | 'input'>>;
  updateStore?: Resolver<ResolversTypes['Store'], ParentType, ContextType, RequireFields<MutationUpdateStoreArgs, 'id' | 'input'>>;
  updateTimer?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationUpdateTimerArgs, 'input'>>;
  updateTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationUpdateTournamentArgs, 'id' | 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>;
  updateUserPicture?: Resolver<ResolversTypes['UserPicture'], ParentType, ContextType, RequireFields<MutationUpdateUserPictureArgs, 'id' | 'input'>>;
  updateUserUserRole?: Resolver<ResolversTypes['UserUserRole'], ParentType, ContextType, RequireFields<MutationUpdateUserUserRoleArgs, 'id' | 'input'>>;
};

export type PaginatedLeaderboardResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedLeaderboard'] = ResolversParentTypes['PaginatedLeaderboard']> = {
  leaderboard?: Resolver<Array<ResolversTypes['PlayerTournamentScore']>, ParentType, ContextType>;
  more?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedTournamentsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedTournaments'] = ResolversParentTypes['PaginatedTournaments']> = {
  more?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerMatchScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerMatchScore'] = ResolversParentTypes['PlayerMatchScore']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  bye?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  match?: Resolver<ResolversTypes['Match'], ParentType, ContextType>;
  matchId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  playerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wonMatch?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerTournamentScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerTournamentScore'] = ResolversParentTypes['PlayerTournamentScore']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  byes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  draws?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  losses?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  player?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  playerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  playerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalPoints?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalTournamentsPlayed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType>;
  tournamentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  wins?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  wonTournament?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProviderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Provider'] = ResolversParentTypes['Provider']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  activeStores?: Resolver<Array<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<QueryActiveStoresArgs, never>>;
  banner?: Resolver<Maybe<ResolversTypes['Banner']>, ParentType, ContextType, RequireFields<QueryBannerArgs, 'id'>>;
  banners?: Resolver<Array<ResolversTypes['Banner']>, ParentType, ContextType>;
  checkNickname?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckNicknameArgs, never>>;
  contact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<QueryContactArgs, 'id'>>;
  contacts?: Resolver<Array<ResolversTypes['Contact']>, ParentType, ContextType>;
  currentTournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<QueryCurrentTournamentsArgs, never>>;
  finishedTournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<QueryFinishedTournamentsArgs, never>>;
  homeBanners?: Resolver<Array<ResolversTypes['Banner']>, ParentType, ContextType>;
  match?: Resolver<Maybe<ResolversTypes['Match']>, ParentType, ContextType, RequireFields<QueryMatchArgs, 'id'>>;
  matches?: Resolver<Array<ResolversTypes['Match']>, ParentType, ContextType>;
  myTournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType>;
  playerLeaderboard?: Resolver<Maybe<ResolversTypes['PaginatedLeaderboard']>, ParentType, ContextType, RequireFields<QueryPlayerLeaderboardArgs, never>>;
  playerMatchScore?: Resolver<Maybe<ResolversTypes['PlayerMatchScore']>, ParentType, ContextType, RequireFields<QueryPlayerMatchScoreArgs, 'id'>>;
  playerMatchScores?: Resolver<Array<ResolversTypes['PlayerMatchScore']>, ParentType, ContextType>;
  playerTournamentScore?: Resolver<Maybe<ResolversTypes['PlayerTournamentScore']>, ParentType, ContextType, RequireFields<QueryPlayerTournamentScoreArgs, 'id'>>;
  playerTournamentScores?: Resolver<Array<ResolversTypes['PlayerTournamentScore']>, ParentType, ContextType>;
  redwood?: Resolver<Maybe<ResolversTypes['Redwood']>, ParentType, ContextType>;
  round?: Resolver<Maybe<ResolversTypes['Round']>, ParentType, ContextType, RequireFields<QueryRoundArgs, 'id'>>;
  rounds?: Resolver<Array<ResolversTypes['Round']>, ParentType, ContextType>;
  searchNonPlayers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerySearchNonPlayersArgs, 'id'>>;
  searchTournaments?: Resolver<ResolversTypes['PaginatedTournaments'], ParentType, ContextType, RequireFields<QuerySearchTournamentsArgs, 'input'>>;
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<QueryStoreArgs, 'id'>>;
  stores?: Resolver<Array<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<QueryStoresArgs, never>>;
  tournament?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<QueryTournamentArgs, 'id'>>;
  tournamentByUrl?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<QueryTournamentByUrlArgs, never>>;
  tournamentPlayers?: Resolver<Maybe<Array<ResolversTypes['PlayerTournamentScore']>>, ParentType, ContextType, RequireFields<QueryTournamentPlayersArgs, 'url'>>;
  tournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<QueryTournamentsArgs, never>>;
  upcomingTournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<QueryUpcomingTournamentsArgs, never>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userPicture?: Resolver<Maybe<ResolversTypes['UserPicture']>, ParentType, ContextType, RequireFields<QueryUserPictureArgs, 'id'>>;
  userPictures?: Resolver<Array<ResolversTypes['UserPicture']>, ParentType, ContextType>;
  userUserRole?: Resolver<Maybe<ResolversTypes['UserUserRole']>, ParentType, ContextType, RequireFields<QueryUserUserRoleArgs, 'id'>>;
  userUserRoles?: Resolver<Array<ResolversTypes['UserUserRole']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUsersArgs, never>>;
};

export type RedwoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['Redwood'] = ResolversParentTypes['Redwood']> = {
  currentUser?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  prismaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['Round'] = ResolversParentTypes['Round']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  matches?: Resolver<Array<Maybe<ResolversTypes['Match']>>, ParentType, ContextType>;
  roundNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  roundTimerLeftInSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  startingTimerInSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType>;
  tournamentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']> = {
  approved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  approvedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  approvedOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  approverId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  distributor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tournaments?: Resolver<Array<Maybe<ResolversTypes['Tournament']>>, ParentType, ContextType>;
  zip?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type TournamentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tournament'] = ResolversParentTypes['Tournament']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dateEnded?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  dateStarted?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  desc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  distance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  infoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  locationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  matches?: Resolver<Array<Maybe<ResolversTypes['Match']>>, ParentType, ContextType>;
  maxPlayers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  ownerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  playerCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  players?: Resolver<Array<Maybe<ResolversTypes['PlayerTournamentScore']>>, ParentType, ContextType>;
  publicRegistration?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  round?: Resolver<Array<Maybe<ResolversTypes['Round']>>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  startingTimerInSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType>;
  storeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timerLastUpdated?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  timerLeftInSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timerStatus?: Resolver<Maybe<ResolversTypes['TimerStatus']>, ParentType, ContextType>;
  tournamentUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  winners?: Resolver<Maybe<Array<Maybe<ResolversTypes['PlayerTournamentScore']>>>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  Contact?: Resolver<Array<Maybe<ResolversTypes['Contact']>>, ParentType, ContextType>;
  Store?: Resolver<Array<Maybe<ResolversTypes['Store']>>, ParentType, ContextType>;
  Tournament?: Resolver<Array<Maybe<ResolversTypes['Tournament']>>, ParentType, ContextType>;
  UserUserRole?: Resolver<Array<Maybe<ResolversTypes['UserUserRole']>>, ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  adminComments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  disabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  disabledBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  disabledOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  dob?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  flags?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  howHeard?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  matches?: Resolver<Array<Maybe<ResolversTypes['PlayerMatchScore']>>, ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photo?: Resolver<Maybe<ResolversTypes['UserPicture']>, ParentType, ContextType>;
  providers?: Resolver<Array<Maybe<ResolversTypes['Provider']>>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tournamentsOwned?: Resolver<Array<Maybe<ResolversTypes['Tournament']>>, ParentType, ContextType>;
  tournamentsPlayed?: Resolver<Array<Maybe<ResolversTypes['PlayerTournamentScore']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userPictureId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPictureResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPicture'] = ResolversParentTypes['UserPicture']> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  smallUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRole'] = ResolversParentTypes['UserRole']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserUserRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserUserRole'] = ResolversParentTypes['UserUserRole']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userRole?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  userRoleId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  PaginatedLeaderboard?: PaginatedLeaderboardResolvers<ContextType>;
  PaginatedTournaments?: PaginatedTournamentsResolvers<ContextType>;
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
  UserUserRole?: UserUserRoleResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  adminOnly?: AdminOnlyDirectiveResolver<any, any, ContextType>;
  requireAuth?: RequireAuthDirectiveResolver<any, any, ContextType>;
  skipAuth?: SkipAuthDirectiveResolver<any, any, ContextType>;
};
