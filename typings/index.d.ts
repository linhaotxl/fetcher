declare type TypeOf<T, K extends keyof T> = T[K];

declare type FetchDataType = 'json' | 'text' | 'blob' | 'formData' | 'arrayBuffer';