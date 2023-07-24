// NOTE: import_map.json is for apps, deps.ts is for modules/libraries
// IMPORTANT: import/export only what's required to avoid bloating bundle

// std
export {
  fromFileUrl,
  join,
  normalize,
  resolve,
  toFileUrl,
} from "https://deno.land/std@0.170.0/path/mod.ts";
export {
  blue,
  bold,
  green,
  red,
  yellow,
} from "https://deno.land/std@0.170.0/fmt/colors.ts";
export { parse as parseArgs } from "https://deno.land/std@0.170.0/flags/mod.ts";
export { TextLineStream } from "https://deno.land/std@0.170.0/streams/text_line_stream.ts";
export { default as question } from "https://deno.land/x/question@0.0.2/mod.ts";
export { load } from "https://deno.land/std@0.192.0/dotenv/mod.ts";

// x/semver
export {
  gte as semverGreaterThanOrEquals,
  valid as semverValid,
} from "https://deno.land/std@0.170.0/semver/mod.ts";

// x/wait
export { Spinner, wait } from "https://deno.land/x/wait@0.1.12/mod.ts";

// x/netzo/apis/netzo
export { netzo } from "../apis/netzo/mod.ts";

// @netzo/api: cherry-pick exports to avoid esm.sh tree-shaking issues
export type {
  Authorization,
  AuthorizationApiKey,
  AuthorizationBasic,
  AuthorizationBearer,
  AuthorizationNone,
  AuthorizationOAuth2,
  AuthorizationOAuth2AuthorizationCode,
  AuthorizationOAuth2ClientCredentials,
  AuthorizationOAuth2Implicit,
  AuthorizationOAuth2PasswordCredentials,
  DenoDeploymentProgress,
  DenoDeploymentProgressAssetNegotiation,
  DenoDeploymentProgressError,
  DenoDeploymentProgressLoad,
  DenoDeploymentProgressStaticFile,
  DenoDeploymentProgressSuccess,
  DenoDeploymentProgressUploadComplete,
  DenoLog,
  DenoLogMessage,
  DenoLogPing,
  DenoLogReady,
  DenoOrganization,
  DenoProject,
  DenoProjectAnalytics,
  DenoProjectDeploymentRequestGitHubActions,
  DenoProjectDeploymentRequestPush,
  DenoProjectDeploymentsResult,
  DenoProjectDeploymentsSummary,
  DenoProjectDomain,
  Deployment,
  DeploymentData,
  Manifest,
  ManifestEntry,
  ManifestEntryDirectory,
  ManifestEntryFile,
  ManifestEntrySymlink,
  Paginated,
  Project,
  ProjectFiles,
  ProjectFilesFile,
  Template,
} from "https://esm.sh/@netzo/api@1.0.31";

// socket.io-client:
export { feathers } from "https://esm.sh/@feathersjs/feathers@5.0.6";
export { default as socketio } from "https://esm.sh/@feathersjs/socketio-client@5.0.6";
export { default as io } from "https://esm.sh/socket.io-client@4.7.1";
