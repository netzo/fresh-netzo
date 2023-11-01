# Workspaces

**Workspaces are top-level containers that own application resources.** Workspaces allow access control and collaboration across Netzo. Members can collaborate on shared resources within Netzo. Several Workspace plans are available, each with distinct usage limits.

![Workspaces](/docs/images/workspaces/workspaces-overview.webp)

Navigating into a Workspace will take you to the Workspace overview page. From here you can navigate to any of the following pages:

- [Projects](/docs/platform/projects)
- [Settings](/docs/platform/workspaces#general)

## Workspace

### General

![Settings general](/docs/images/workspaces/workspaces-settings-general.webp)

Displays general account information like

- user ID,
- display name

and workspace preferences like

- setting a custom avatar image for the Workspace (must provide a valid image URL).

### Members

![Settings members](/docs/images/workspaces/workspaces-settings-members.webp)

**Members of a Workspace are users accounts with access to the Workspace.** Each member can have any of the following user roles:

- `admin`
- `developer`
- `user`

The role will determine the permissions each member has within the Workspace. The [Members page](/docs/platform/workspaces#members) under Workspace settings gives an overview of all members of a Workspace.

Here you can manage Users of the current Workspace along with their roles (e.g. `admin`, `developer`, `user`). If you have sufficient rights, you can add more Users to the workspace or choose to leave it if you are not the sole Workspace `admin`.

### Audit Logs

![Settings audit logs](/docs/images/workspaces/workspaces-settings-audit-logs.webp)

**Audit Logs provide a chronological history of events documenting the activity inside a Workspace.** Audit Logs are in the form of `debug`, `info`, `warn` and `error` logs and can be exported as JSON for further analysis.

### Close Workspace

![Settings close workspace](/docs/images/workspaces/workspaces-settings-close-workspace.webp)

Here you can delete the **Workspace** permanently. All resources contained within the **Workspace** will be deleted and members will be kicked-out automatically as well (without being notified).

::: danger Closing a Workspace is permanent and can't be undone.
:::

<!-- ## Usage and Limits

![Settings usage and limits](/docs/images/workspaces/workspaces-settings-usage-and-limits.webp)

The Workspace plan determines the features and usage limits available for the Workspace. -->

<!-- The following Workspace plans are available:

- Free
- Start
- Scale
- Pro
- Enterprise -->

## Subscription

### Usage and Limits

Here you can view the current usage and limits of the Workspace. The Workspace plan determines the features and usage limits available for the Workspace.

## Development

### API keys

![Settings API keys](/docs/images/workspaces/workspaces-settings-api-keys.webp)

**API keys are tokens you can use to authenticate with the Netzo API.** API keys are for machines what username-password combinations are for users. <!-- API keys are scoped to the containing workspace and can be assigned certain permissions at creation (admin rights by default).  --> They can be temporarily enabled and disabled (revoked) or deleted entirely, simplifying the management of the 3rd party applications and services using them.

Here you can manage, view, and create [API keys](/docs/platform/workspaces#api-keys) to authorize requests to the [Netzo API](/docs/api-reference/index). You can temporarily disable (revoke) API keys by flipping the switch off. Requests made with a disabled (revoked) API key will be blocked, returning a `401 Unauthorized` error. To re-enable an API key, simply flip the switch on again.

### Variables

**Variables are a way to store and reuse values and secrets in your code.** You can use variables in projects by adding them as environment variables and referencing them in code with `Deno.env.get("VARIABLE_NAME")`. All variables are encrypted at rest.