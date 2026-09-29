## 🌿 Git Workflow & Branching Strategy

This project follows the standard GitHub Flow and adheres to the [Conventional Commits](https://www.conventionalcommits.org/) standard for a clean and readable commit history.

### Branching Convention
- `main` : Production-ready code. Automatically deployed to Vercel.
- `feature/<name>` : Development of new features (e.g., `feature/dark-mode`).
- `fix/<name>` : Bug fixes (e.g., `fix/mobile-navbar`).
- `hotfix/<name>` : Urgent production fixes directly branching from main.

### Commit Conventions
We use prefixes to categorize commits. Format: `type: short description`

- `feat:` Adds a new feature or functionality.
- `fix:` Fixes a bug or error.
- `style:` Changes to styling, formatting, or UI without affecting logic (CSS, Tailwind classes).
- `refactor:` Code changes that neither fix a bug nor add a feature (optimizing performance/structure).
- `chore:` Routine tasks, dependency updates, or configuration changes.
- `docs:` Updates to `README.md` or other documentation files.

**Example Commits:**
- `feat: add basic auth middleware for admin dashboard`
- `style: update layout and typography for project cards`
- `chore: install supabase-js dependency`