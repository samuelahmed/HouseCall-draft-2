
![Alt text](https://github.com/samuelahmed/HouseCall-draft-2/blob/074d033f8a8d7d6a4972f4856ab2a6086b094b7e/prisma/dbImg/feb3_2023.png?raw=true "Optional Title")

```
📦src

 ┣ 📂components
 ┃ ┣ 📂account
 ┃ ┃ ┗ 📜accountEditModal.tsx
 ┃ ┣ 📂caregiver
 ┃ ┃ ┣ 📂modals
 ┃ ┃ ┃ ┣ 📜historyModal.tsx
 ┃ ┃ ┃ ┣ 📜mobileFindSessionModal.tsx
 ┃ ┃ ┃ ┗ 📜scheduledSessionModal.tsx
 ┃ ┃ ┗ 📂tabs
 ┃ ┃ ┃ ┣ 📜activeTab.tsx
 ┃ ┃ ┃ ┣ 📜findTab.tsx
 ┃ ┃ ┃ ┗ 📜historyTab.tsx
 ┃ ┣ 📂engines
 ┃ ┃ ┗ 📜searchEngine.tsx
 ┃ ┣ 📂forms
 ┃ ┃ ┣ 📜loginForm.tsx
 ┃ ┃ ┗ 📜registerForm.tsx
 ┃ ┣ 📂help
 ┃ ┃ ┣ 📜contactUs.tsx
 ┃ ┃ ┗ 📜supportDocumentation.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜footer.tsx
 ┃ ┃ ┣ 📜header.tsx
 ┃ ┃ ┣ 📜navLayout.tsx
 ┃ ┃ ┣ 📜sideNav.tsx
 ┃ ┃ ┗ 📜themeManager.tsx
 ┃ ┣ 📂messages
 ┃ ┃ ┣ 📜demoConversationTwo.tsx
 ┃ ┃ ┣ 📜demoConversationTwoCopy.tsx
 ┃ ┃ ┣ 📜messageDashboardConnectionCard.tsx
 ┃ ┃ ┗ 📜messageDashboardConnectionCardJohn.tsx
 ┃ ┗ 📂patient
 ┃ ┃ ┣ 📜activeSessionPatient.tsx
 ┃ ┃ ┣ 📜createCareSession.tsx
 ┃ ┃ ┗ 📜historyPatient.tsx
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
 ┃ ┣ 📜_app.tsx
 ┃ ┣ 📜account.tsx
 ┃ ┣ 📜caregiver.tsx
 ┃ ┣ 📜help.tsx
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜loginSuccess.tsx
 ┃ ┣ 📜messages.tsx
 ┃ ┣ 📜patient.tsx
 ┃ ┣ 📜register.tsx
 ┃ ┗ 📜signin.tsx

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
