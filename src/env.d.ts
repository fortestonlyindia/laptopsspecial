/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
    readonly RESEND_API_KEY: string;
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
}