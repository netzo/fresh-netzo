# Frequently Asked Questions

The following FAQ provide answers to some common questions about Netzo.

## Why use Netzo?

:::details What are software solutions?
Software solutions are software applications, both frontend interfaces and backed services, designed to support and streamline a company's internal operations and processes. They may be used both by internal teams within the organization as well as by external customers, partners and interested parties depending on the use case. Some examples may include custom dashboards, Know-Your-Customer panels, customer and supplier portals, ticketing systems, and workflow automation. The goal of software solutions is to boost efficiency, productivity, and the competitive edge within a company.
:::

:::details What makes Netzo unique?
Netzo's code-centric approach to business software offers organizations a highly customizable and effective way of building software solutions and sharing them within their teams and organization. Netzo combines both frontend and backend development, enabling the programmatic building of visual interfaces and extending API functionality through modular scripts, within a single space. This offers the ability to connect to any API, process any data, automate any process, and build any interface, providing full flexibility and control over your solutions.
:::
:::details How is Netzo different than others like Retool or Zapier?
Netzo bundles the two key areas of development, frontend and backend. Unlike competitors, who focus solely on visual interfaces or "backend" functionality, Netzo packs both in a single application. With Netzo,s technical teams are empowered to connect any API, process any data, automate any process and build any interface, ultimately maintaining control over your integrations.
:::
:::details How does Netzo help escape vendor lock-in and technological debt??
In two ways. First, by enabling technical teams to write pure, vanilla JS/TS and second, by enabling code portability. Unlike other platforms, with JavaScript-like extensibility, developments run exclusively in their infrastructure due to proprietary functionalities. Netzo runs on pure open-source JS/TS enabling you to export your code projects, if required in the future. Furthermore, Neto scripts are executed on Deno runtime, which ensures that your code is portable and can be run anywhere.
:::
:::details Is Netzo only for developers?
No. Software solutions are meant for teams across departments and organizations. While the Admin and Developer interface is meant for the technical team, organization members are users of the production-ready internal UIs, dashboards and apps. Aligning teams in a single application enables key experts to submit their feedback and build side-by-side with the tech team via **continuous collaborative development cycles**.
:::
:::details How can Netzo enhance API adoption?
Effective adoption of APIs can be challenging, as many tools are not fully utilized. Netzo addresses this issue by increasing visibility into the apps you use and their underlying functionality, making it easier to build your digital enterprise incrementally. By making it easier to discover and understand the capabilities of APIs, Netzo helps to increase their adoption and utilization within your organization.
:::
:::details What are the benefits of Netzo compared to other No-code/low-code Platforms?
A code-centric approach, such as Netzo, offers greater flexibility and scalability in creating custom business software and automating complex workflows. Unlike UI-based no-code/low-code platforms, a code-centric approach allows for programmatic building and easy adaptation as your organization's processes evolve. Additionally, it eliminates the limitations and drawbacks that come with using a no-code/low-code platform and allows for true customization to meet the specific needs of your team.
:::

::: details How does Netzo streamline DX over traditional infrastructure providers like AWS, GCP and Azure?
Netzo eliminates the need for DevOps expertise, allowing developers to focus on writing code. In contrast, deploying and maintaining services on traditional platforms requires extensive DevOps knowledge and effort. Netzo bundles a suite of developer tools including, logs and analytics, secret management, authorization management and schedules and more within a single user-friendly place, replacing complex modules from traditional providers. For software solutions, Netzo provides a cost-effective and efficient solution for implementing customized solutions with ease.
:::

## Security

:::details How does Netzo secure my APIs?
Netzo ensures end-to-end security through SSL encryption at transport and rest. APIs are authenticated only once through their supported mechanisms, and secrets are stored as encrypted values at rest. By minimizing the number of API keys and providing an additional layer of security for access and control, Netzo reduces the risk of leaks and enables centralized management of access and control through roles.
:::
:::details How are Scripts executed in Netzo?
Netzo scripts are executed as close to the end user as possible at the network edge, powered by Deno, a secure and reliable runtime for serverless computing. This means that the server (your script) is spawned only when a request is made, and processed information is not stored. Once deployed, scripts will continue to run until you update and redeploy them.
:::
:::details Is my data secure with Netzo?
Netzo prioritizes security and does not store any sensitive information, except for debugging purposes such as logs. Only your client computer and your serverless scripts will display or process the data you input, whether it is querying your APIs or executing serverless scripts.
:::
:::details Can I self-host Netzo?
Currently we do not offer on-premise deployment options. However, only the application interface and minimal app data is stored by us and delivered to the client computer when using our service.
:::
:::details How does Netzo ensure the transport encryption of my data?
Netzo uses Secure Sockets Layer (SSL) to encrypt all data in transit. This means that all data sent between the client and the server is encrypted, providing a secure connection and protecting against eavesdropping, tampering and message forgery. This ensures that your data is protected while in transit, so it can't be intercepted or read by unauthorized parties. Additionally, Netzo also encrypts the data stored at rest, to guarantee the confidentiality, integrity and availability of the data even when is not in transit.
:::

## Technology

:::details What programming languages does Netzo support?
Netzo supports JavaScript (JS), TypeScript (TS), JSX, and TSX for source code. These languages are commonly used for web development and are well-suited for building custom business software and automating complex workflows.
:::

:::details What file types are supported in the Projects module?

Netzo supports the following file types:

- Source code: `.ts`, `.tsx`, `.js`, .`jsx` - these are the files that contain the actual code to be executed and are typically the entrypoint file of a project.
- Static assets: `.html`, `.css`, `.json`, `.xml`, `.md`, `.txt`, `.yaml`, `.yml`, `.graphql` - these are files that are included alongside the source code within a project and are typically used for web development such as styling, layout, and data.

All files are automatically hosted under `https://api.netzo.io/projects/:projectId/:filepath` (note that the (nested) filepath should include one of the above extensions)
:::

::: details Why are other programming languages (e.g. Python) not supported?
Netzo takes advantage of "Serverless Isolates" or "Worker Runtimes" technology (such as Cloudflare Workers and Deno Deploy), which are exclusive to JavaScript and TypeScript as they are based on the Google V8 runtime. This means that solutions that allow programming in other languages cannot be deployed to this type of cloud, missing out on the many benefits it brings such as:

- minimal startup and network latencies,
- instantaneous and global deployment to the edge, and
- increased development speed and built-in CI/CD.

JavaScript is the most widely used programming language in the world, some benefits include:

- JavaScript has the largest code library repository (NPM),
- Shares APIs with native web browsers, and
- Benefits from the highest degree of standardization (ECMAScript) among all languages.

As stated by [Atwood's law](https://en.wikipedia.org/wiki/Jeff_Atwood#:~:text=In%202007%2C%20Jeff%20Atwood%20made,question%2Dand%2Danswer%20website.), "Any application that can be written in JavaScript will eventually be written in JavaScript".
:::
