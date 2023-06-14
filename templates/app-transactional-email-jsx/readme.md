# Netzo Transactional Emails with Sendinblue

## Usage

URL: https://64077ad7d1988552626b9015.netzo.io

1. Preview the HTML template with a GET request to
   `https://{deploymentId}.netzo.io/{templateName}`
2. Create a new transactional email by POST to
   `https://{deploymentId}.netzo.io/{templateName}` and pass required POST body
3. Build the `POST` body in a flat object { }

```info
Include "Content-Type: application/json" in the headers and amek sure you have VALID json
```

## Templates

#### 1. `/`

[Preview](https://64077ad7d1988552626b9015.netzo.io)

Returns the `readme.md` file and the required variables by each HTML email
template `POST` body

```json
{
  "inviterEmail": "miguel.romero@netzo.io",
  "inviterFirstName": "Miguel",
  "inviterLastName": "Romero",
  "invitedEmail": "arturo.romero@netzo.io",
  "workspaceName": "Netzo",
  "subject": "Join Miguel",
  "templateName": "workspace-send-invitation"
}
```

#### 2. `/newsletter-subscription-doi`

[Preview](https://64077ad7d1988552626b9015.netzo.io/newsletter-subscription-doi)

```json
{
  "inviterEmail": "miguel.romero@netzo.io",
  "inviterFirstName": "Miguel",
  "inviterLastName": "Romero",
  "invitedEmail": "arturo.romero@netzo.io",
  "workspaceName": "Netzo",
  "subject": "Join Miguel",
  "templateName": "workspace-send-invitation"
}
```

#### 3. `/workspace-send-invitation`

[Preview](https://64077ad7d1988552626b9015.netzo.io/workspace-send-invitation)

```json
{
  "inviterEmail": "miguel.romero@netzo.io",
  "inviterFirstName": "Miguel",
  "inviterLastName": "Romero",
  "invitedEmail": "arturo.romero@netzo.io",
  "workspaceName": "Netzo",
  "subject": "Join Miguel",
  "templateName": "workspace-send-invitation"
}
```

#### 4. `/users-welcome`

[Preview](https://64077ad7d1988552626b9015.netzo.io/users-welcome)

```json
{
  "inviterEmail": "miguel.romero@netzo.io",
  "inviterFirstName": "Miguel",
  "inviterLastName": "Romero",
  "invitedEmail": "arturo.romero@netzo.io",
  "workspaceName": "Netzo",
  "subject": "Join Miguel",
  "templateName": "workspace-send-invitation"
}
```

#### 5. `/users-inactivity-6months`

[Preview](https://64077ad7d1988552626b9015.netzo.io/users-inactivity-6months)

```json
{
  "inviterEmail": "miguel.romero@netzo.io",
  "inviterFirstName": "Miguel",
  "inviterLastName": "Romero",
  "invitedEmail": "arturo.romero@netzo.io",
  "workspaceName": "Netzo",
  "subject": "Join Miguel",
  "templateName": "workspace-send-invitation"
}
```

#### 6. `/website-contact-form-autoresponse`

[Preview](https://64077ad7d1988552626b9015.netzo.io/website-contact-form-autoresponse)

```json
{
  "inviterEmail": "miguel.romero@netzo.io",
  "inviterFirstName": "Miguel",
  "inviterLastName": "Romero",
  "invitedEmail": "arturo.romero@netzo.io",
  "workspaceName": "Netzo",
  "subject": "Join Miguel",
  "templateName": "workspace-send-invitation"
}
```
