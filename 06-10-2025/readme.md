# Github practice

### To clone and work on the specific branch
- git clone "http_url_of_the_repo"
- git add . (. refers to all files, else you can list the files seprately)
- git commit -m "init"
- git push origin 

### To clone specific branch 
- git clone -b <branch_name> "http_url_of_the_repo"

### To clone specific directory
- git clone -b <branch_name> "http_url_of_the_repo" <folder_name>


### To start a repo from stratch
- git init
- git add readme.md
- git commit -m "init"
- git remote add origin git@github.com:abhinandan-kv/<repo_name>.git    (remove angle bracket with repo_name)
- git push -u origin main


### To switch branch / create branch
- After cloning 
- git branch (this will list all the branch available)
- git branch --all (this will list all the branch even in remote origin if the repo is cloned)
- git switch branch_name (the branch should exists)
- git checkout branch_name (this creates new branch)


### To stash changes
- git stash 
- git stash push -m "message"
- git list stash
- git stash branch branch_name
- git stash apply stash@{n} (restore specific stash)
- git stash pop (delete last stash)
- git stash clear


### History
- git log
- git log --oneline (summary of commits)
- git show <commit_id> (shows detail report of the commit_id, without angle brackets)
- git diff (shows unstaged changes)
- git diff --staged (shows staged changes)


### Check status
- git status (check frequently to track whats happening)



### Undoing mistakes
- git restore <file_name> (restore file before staging)
- git restore --staged <file_name> (remove file from staging area)
- git reset HEAD~ (undo last commit and keep everything in working directory)
- git commit --amend (change the last commit message or add files to your last commit)

