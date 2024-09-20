type SafeUnknown<T> = T extends undefined ? never : T extends null ? never : T
