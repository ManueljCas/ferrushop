// global.d.ts

declare namespace google {
  namespace accounts {
    namespace id {
      interface CredentialResponse {
        credential: string;
      }

      interface IdConfiguration {
        client_id: string;
        callback: (response: CredentialResponse) => void;
      }

      function initialize(config: IdConfiguration): void;
      function renderButton(
        parent: HTMLElement,
        options: { theme: string; size: string }
      ): void;
    }
  }
}
