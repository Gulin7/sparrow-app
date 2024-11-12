interface HttpRequestKeyValueCheckedWithBaseBaseInterface {
  key: string;
  value: string;
  checked: boolean;
  base: string;
}
interface HttpRequestKeyValueCheckedBaseInterface {
  key: string;
  value: string;
  checked: boolean;
}

interface HttpRequestBodyBaseInterface {
  raw?: string;
  urlencoded?: HttpRequestKeyValueCheckedBaseInterface[];
  formdata?: {
    text: HttpRequestKeyValueCheckedBaseInterface[];
    file: HttpRequestKeyValueCheckedWithBaseBaseInterface[];
  };
}

interface HttpRequestBasicAuthBaseInterface {
  username?: string;
  password?: string;
}

interface HttpRequestApiKeyBaseInterface {
  authKey: string;
  authValue: string;
  addTo: string;
}

interface HttpRequestAuthBaseInterface {
  bearerToken?: string;
  basicAuth?: HttpRequestBasicAuthBaseInterface;
  apiKey?: HttpRequestApiKeyBaseInterface;
}

export interface HttpRequestBaseInterface {
  method: string;
  operationId: string;
  url: string;
  body: HttpRequestBodyBaseInterface[];
  selectedRequestBodyType: string;
  selectedRequestAuthType: string;
  queryParams: HttpRequestKeyValueCheckedBaseInterface[];
  auth: HttpRequestAuthBaseInterface;
  headers: HttpRequestKeyValueCheckedBaseInterface[];
}

export enum GraphqlRequestDefaultAliasBaseEnum {
  NAME = "GraphQL",
}
