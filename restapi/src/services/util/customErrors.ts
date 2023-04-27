    export class InvalidRequestBodyError extends Error {
        constructor(msg: string) {
            super(msg);

            Object.setPrototypeOf(this, InvalidRequestBodyError.prototype);
        }
    }

    export class PodProviderError extends Error {
        constructor(msg: string) {
            super(msg);

            Object.setPrototypeOf(this, InvalidRequestBodyError.prototype);
        }
    }