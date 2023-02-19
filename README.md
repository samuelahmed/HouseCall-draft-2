
```
📦src

 ┣ 📂components
 ┃ ┣ 📂account
 ┃ ┃ ┗ 📜accountEditModal.tsx
 ┃ ┣ 📂caregiver
 ┃ ┃ ┣ 📜appliedEngine.tsx
 ┃ ┃ ┣ 📜discoverEngine.tsx
 ┃ ┃ ┣ 📜historyEngine.tsx
 ┃ ┃ ┗ 📜scheduledEngine.tsx
 ┃ ┣ 📂engines
 ┃ ┃ ┣ 📜searchEngine.tsx
 ┃ ┃ ┗ 📜selectSessionType.tsx
 ┃ ┣ 📂forms
 ┃ ┃ ┣ 📜loginForm.tsx
 ┃ ┃ ┗ 📜registerForm.tsx
 ┃ ┣ 📂help
 ┃ ┃ ┣ 📜contactUs.tsx
 ┃ ┃ ┗ 📜supportDocumentation.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜header.tsx
 ┃ ┃ ┣ 📜navLayout.tsx
 ┃ ┃ ┣ 📜navMenu.tsx
 ┃ ┃ ┣ 📜sideNav.tsx
 ┃ ┃ ┗ 📜themeManager.tsx
 ┃ ┣ 📂messages
 ┃ ┃ ┣ 📜demoConversationTwo.tsx
 ┃ ┃ ┣ 📜demoConversationTwoCopy.tsx
 ┃ ┃ ┣ 📜messageDashboardConnectionCard.tsx
 ┃ ┃ ┗ 📜messageDashboardConnectionCardJohn.tsx
 ┃ ┗ 📂patient
 ┃ ┃ ┣ 📜activeEngine.tsx
 ┃ ┃ ┣ 📜canceledEngine.tsx
 ┃ ┃ ┣ 📜createCareSession.tsx
 ┃ ┃ ┣ 📜newEngine.tsx
 ┃ ┃ ┗ 📜patientScheduledEngine.tsx

 ┣ 📂env
 ┃ ┣ 📜client.mjs
 ┃ ┣ 📜schema.mjs
 ┃ ┗ 📜server.mjs

 ┣ 📂pages
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📜[...nextauth].ts
 ┃ ┃ ┣ 📂trpc
 ┃ ┃ ┃ ┗ 📜[trpc].ts
 ┃ ┃ ┣ 📜examples.ts
 ┃ ┃ ┗ 📜restricted.ts
 ┃ ┣ 📂careSession
 ┃ ┃ ┗ 📜[slug].tsx
 ┃ ┣ 📂caregiver
 ┃ ┃ ┗ 📜[slug].tsx
 ┃ ┣ 📂dashboard
 ┃ ┃ ┣ 📂caregiver
 ┃ ┃ ┃ ┣ 📜applied.tsx
 ┃ ┃ ┃ ┣ 📜discover.tsx
 ┃ ┃ ┃ ┣ 📜history.tsx
 ┃ ┃ ┃ ┗ 📜scheduled.tsx
 ┃ ┃ ┣ 📂patient
 ┃ ┃ ┃ ┣ 📜active.tsx
 ┃ ┃ ┃ ┣ 📜canceled.tsx
 ┃ ┃ ┃ ┣ 📜completed.tsx
 ┃ ┃ ┃ ┣ 📜create.tsx
 ┃ ┃ ┃ ┣ 📜new.tsx
 ┃ ┃ ┃ ┗ 📜scheduled.tsx
 ┃ ┃ ┣ 📜account.tsx
 ┃ ┃ ┗ 📜messages.tsx
 ┃ ┣ 📜_app.tsx
 ┃ ┣ 📜help.tsx
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜login.tsx
 ┃ ┣ 📜loginSuccess.tsx
 ┃ ┗ 📜register.tsx

 ┣ 📂server
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📜get-server-auth-session.ts
 ┃ ┣ 📂db
 ┃ ┃ ┗ 📜client.ts
 ┃ ┗ 📂trpc
 ┃ ┃ ┣ 📂router
 ┃ ┃ ┃ ┣ 📜_app.ts
 ┃ ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┃ ┣ 📜careSessionRouter.ts
 ┃ ┃ ┃ ┗ 📜userRouter.ts
 ┃ ┃ ┣ 📜context.ts
 ┃ ┃ ┗ 📜trpc.ts
 
 ┣ 📂styles
 ┃ ┗ 📜globals.css
 ┣ 📂types
 ┃ ┗ 📜next-auth.d.ts
 ┣ 📂utils
 ┃ ┗ 📜trpc.ts
 ┣ 📂validation
 ┃ ┗ 📜auth.ts

 ```

![db Schema](https://github.com/samuelahmed/HouseCall-draft-2/blob/2f0593251bf01309be4efa881d28aa6292c9002c/prisma/dbImg/feb3_2023.png?raw=true "DB Schema")


