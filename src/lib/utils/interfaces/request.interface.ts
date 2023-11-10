import type { Headers, QueryParams } from "../dto";
import type { AuthSection, AuthType } from "../enums/authorization.enum";
import type { ItemType } from "../enums/item-type.enum";
import type {
  RequestDataset,
  RequestSection,
  RequestType,
} from "../enums/request.enum";

export interface Path {
  workspaceId: string;
  collectionId: string;
  folderId?: string;
  folderName?: string;
}

export interface Response {
  headers: unknown;
  status: string;
  body: string;
}

export interface RequestBody {
  method: string;
  url?: string;
  body?: string;
  headers?: Headers[];
  queryParams?: QueryParams[];
}

export interface KeyValuePair {
  key: string;
  value: string;
  checked: boolean;
}

export interface KeyValuePairWithBase {
  key: string;
  value: string;
  checked: boolean;
  base: string | ArrayBuffer;
}

export interface FormData {
  key: string;
  value: string;
  checked: boolean;
}

export interface Body {
  raw?: string;
  urlencoded?: KeyValuePair[];
  formdata?: {
    text: KeyValuePair[];
    file: KeyValuePairWithBase[];
  };
}

export interface State {
  raw?:
    | RequestType.HTML
    | RequestType.JSON
    | RequestType.JavaScript
    | RequestType.Text
    | RequestType.XML;
  dataset?:
    | RequestDataset.FORMDATA
    | RequestDataset.NONE
    | RequestDataset.RAW
    | RequestDataset.URLENCODED;
  auth?:
    | AuthType.API_KEY
    | AuthType.BASIC_AUTH
    | AuthType.BEARER_TOKEN
    | AuthType.NO_AUTH;
  section?:
    | RequestSection.PARAMETERS
    | RequestSection.REQUEST_BODY
    | RequestSection.HEADERS
    | RequestSection.AUTHORIZATION;
}

export interface BasicAuth {
  username?: string;
  password?: string;
}

export interface ApiKey {
  authKey: string;
  authValue: string;
  addTo: AuthSection.HEADER | AuthSection.QUERY_PARAMETER;
}

export interface Auth {
  bearerToken?: string;
  basicAuth?: BasicAuth;
  apiKey?: ApiKey;
}

export interface Request {
  method: string;
  body?: Body;
  url?: string;
  headers?: Headers[];
  queryParams?: QueryParams[];
  response?: Response;
  state?: State;
  auth?: Auth;
}

export interface NewTab {
  id: string;
  name: string;
  type: ItemType.COLLECTION | ItemType.FOLDER | ItemType.REQUEST;
  request?: Request;
  save: boolean;
  requestInProgress: boolean;
  path?: Path;
}

export interface CurrentTab {
  id: string | null;
}
