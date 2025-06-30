# Employee Management Panel

A simple and modular **Employee Management Application** built with [Lit](https://lit.dev/), [Vaadin Components](https://vaadin.com/components), and a custom Redux-like store management.

## 📋 Features

- Add, update, and delete employee records
- Form validation with custom error handling
- Modular and reusable UI components
- Localization support (currently English and Turkish)
- Responsive design with CSS Grid
- State management via global `store` (Redux pattern)
- Modal confirmation dialogs
- Editable forms with pre-filled data
- XLIFF-based localization with `@lit/localize`

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```bash
src/
│
├── components/
│   ├── va-form.js
│   ├── va-select.js
│   └── ...
│
├── pages/
│   ├── edit-page.js
│   └── ...
│
├── store/
│   ├── store.js
│   ├── form-slice.js
│   ├── employee-slice.js
│   └── modal-slice.js
│
├── locales/
│   └── tr.xlf
│
└── main.js
```

---

## 🌍 Localization

- This project uses `@lit/localize` for i18n.
- To add or update translations:
  - Edit the `tr.xlf` file in `locales/`.
  - Run the `lit-localize` build if configured.

---

## ✨ Technologies Used

- Lit (Web Components)
- Vaadin UI Components
- Redux-style store (custom)
- CSS Grid / Flexbox
- `@lit/localize`
- Vaadin Router

---

## 📝 License

This project is licensed under the MIT License.
