# AIR2219 - eFlush

System for managing electronic locks of public toilets.

## Git flow instructions: 
### main vs/and develop
Instead of a single `main` branch, we use two branches (potentially three if we decide to later add the staging branch) to record the history of the project. The `main` branch stores the official release history, and the `develop` branch serves as an integration branch for features.
`develop` is a default protected branch. Protected means that **_nobody_ can push code directly to it**. Actual work always happens on feature (and bugfix) branches.

---

### Feature branches
Each new feature should reside in its branch. But, instead of branching off of `main`, feature branches use `develop` as their parent branch. When a feature is complete, it gets merged back into `develop` (pull requests + code reviews). Features should never interact directly with main.

---

### Bugfix branches
These branches adhere to the same rules and principles as feature branches but are used to fix bugs, not implement new features.

---

### Naming conventions
**Important note: Temporary branches must not be deleted (Project specific behavior)**

Collectively, feature and bugfix branches are known as temporary branches. As the name implies, these are disposable branches that can be created and deleted by the need of the developer or deployer. Most conventions recommend leading the branch name with prefixes like `hotfix`, `feature`, or some other variant of the categorization of tasks.

1. Branch name start with a type keyword (`feature` or `bugfix`)
2. Next comes the `/` sign
3. The third thing is the GitHub issue number  
_Note: this means that for every branch an issue needs to be created. Normally, issues get created before branches because they define what needs to be done and how._
4. Next comes the `_` sign
5. The last thing is the name of the issue with `-` instead of the spaces

For example, if we have an issue on GitHub named "Implement login form" and it's an issue #10, the branch name should be `feature/10_implement-login-form`.

---

### Step-by-step workflow

1. we first `checkout` to the `develop` branch
2. `git pull` - getting the latest updates from the repo
	* **IMPORTANT** to pull every time we need to make a new `feature` or `bugfix` branch
3. `git checkout -b feature/[issue number]_[key-words]`
4. commit changes on our branch
5. after we complete the issue, we push the changes on the remote repo with `git push`
6. open PR (pull request) to merge the `feature` or `bugfix` branch to the develop branch
	* set someone as a reviewer to give feedback or confirm the merge
	* we merge to the `develop` branch

---

### Useful commands

**SCENARIO**: you accidentally made some changes on a wrong branch

1. `git stash`
	* saves all the changes in the "clipboard"
2. `git checkout [branch-we-should-be-on]` 
	* if we didn't create the branch, we add `-b` to the command 
3. `git stash pop`
	* pasting all the changes on the new branch

**SCENARIO**: you made a commit, but you forgot to stage a file or you wrote a wrong commit message

1. `git commit --amend`
	* stage all the missing files then commit
	* after the `commit --amend`, change the message
2. `git commit --amend --no-edit`
	* same as the command before, but doesn't change the message

