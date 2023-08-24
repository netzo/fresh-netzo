# Settings

## General

![Settings general](/docs/images/projects/projects-settings-general.webp)

### Name

The name of the Project. This is used to identify the Project and is also used in the URL to invoke the Project.

### Description

The description of the Project. This is used to provide additional information about the Project.

### Labels

Labels are used to categorize Projects. They are used to filter out and group Projects together for easier management.

## Access Control

![Settings access control](/docs/images/projects/projects-settings-access-control.webp)

### Visibility

The visibility of a Project determines who can access it. There are two options:

- **Public:** do not require an API key to invoke the Project (public URL)
- **Private:** require an API key to invoke the Project

## Configuration

![Settings configuration](/docs/images/projects/projects-settings-configuration.webp)

<!-- ### Source

The source of a Project can be either a URL or a GitHub repository. -->

### Deployment

A Project can be deployed to a specific environment. This will create a new deployment and boot it. The `deploymentId` is used to identify the deployment and in the URL to invoke the Project.

### Entrypoint File

The entrypoint file is the file that will be executed when a Project is invoked. This file will be executed as-is, without the need for a build step.

You can check if the current file is the entrypoint file by checking the `import.meta.main` boolean variable.

### Environment Variables

Environment variables are key-value pairs that are available to your Project at runtime. They can be used to store secrets, configuration values and more. Environment variables are scoped to the Project and are not shared with other Projects. All Projects have two environments: `development` and `production`.

<!-- ### Permissions

The permissions for the runtime are `--allow-read`, `--allow-env` and `--allow-net` by default. The code does not run permissively, only the files and environment variables defined in the Project can be accessed within the code.

Network permissions can be restricted by specifying allowed hostnames in the Deployment configuration and can be either an array of hostnames or a boolean, for example:

- `true`: allows all hosts (default)
- `false`: deny all hosts
- `[]`: allow no network access
- `[example.com]`: allows all hosts under `example.com`
- `[example.com, example.org]`: allows all hosts under `example.com` and `example.org` -->

## Transfer/Delete

![Settings transfer/delete](/docs/images/projects/projects-settings-transfer-delete.webp)

Transfer the Project to another Workspace or delete the Project permanently.
