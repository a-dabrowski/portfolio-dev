---
title: 'How to edit Git commits'
excerpt: 'Coherent commit history improves readability of your repository changes. It''s a human thing to make an error when creating a commit - either with commit message or commit changes. Creating additional commit in such case with a "change for another change" will introduce "noise" when reviewing git history. Here is a couple of solutions to edit commits depending on which commit you want to change.'
coverImage: '/assets/blog/dynamic-routing/cover.jpg'
date: '2023-02-10T15:08:54.123Z'
author:
  name: Adam Dąbrowski
  picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '/assets/blog/dynamic-routing/cover.jpg'
---

# How to edit Git commits

Coherent commit history improves readability of your repository changes. It's a human thing to make an error when creating a commit - either with commit message or commit changes. Creating additional commit in such case with a "change for another change" will introduce "noise" when reviewing git history. Here is a couple of solutions to edit commits depending on which commit you want to change.

## Edit last commit

Changing last commit on current branch is a straightforward thing.

To change only git message - run `git commit --amend`. You will be prompted with a git editor where you can modify commit message.

To change contents of changes for last commit, add changes with `git add` and then run `git commit --amend`. You will be prompted with git editor to edit commit message if you want (you should if there's a handful of changes), though it's not mandatory to edit the commit message once git editor opens. If you don't want to edit the commit message you can run `git commit --amend --no-edit`.

It's important to know that if the last commit has been already pushed to remote before amending, then you will have to use `git push --force` in order to push the modified commit.

## Edit a specific commit in git history

Editing a commit other than the last involves more steps but it's not day and night difference in terms of complexity. First of all, specify the commit SHA you want to edit. `git log` will return a list of commits, starting with the most recent one.

```
commit ec060f459bb3de080a439a392bef3e0a661c0166 (HEAD -> master, origin/master, origin/HEAD)
Author: Adam Dabrowski <adam.dabrowski@outlook.com>
Date:   Tue Feb 7 17:08:00 2023 +0100

    Dump on master

commit 97f9f3e5a58afbf948b54695cb7e4a4607e4b922
Author: Adam Dabrowski <adam.dabrowski@outlook.com>
Date:   Sun Nov 13 13:25:56 2022 +0100

    create Makefile

commit 5b2c99673754ef0f9d38ba595767ad7cd476653b
Author: Adam Dabrowski <adam.dabrowski@saucelabs.com>
Date:   Wed Nov 9 17:07:33 2022 +0100

    Lower nodejs version for Next

commit 68d3a1900458af8fa1e822bb5980663c12ff61a7
Author: Adam Dabrowski <adam.dabrowski@saucelabs.com>
Date:   Wed Nov 9 17:02:24 2022 +0100

    Initial project setup with Next JS

<OTHER COMMITS>
```

So for example, I notice that I haven't created an ESLint configuration file. Once I create it I can either create a new commit with this single change or fixup commit with project setup. I pick an SHA of the commit: `68d3a1900458af8fa1e822bb5980663c12ff61a7`. Add changes with `git add` then run `git commit --fixup COMMIT_SHA`. In example case it would be `git commit --fixup 68d3a1900458af8fa1e822bb5980663c12ff61a7`. This creates an additional commit marked as a fixup.

```
commit b3397c9cf133fe31254668d9372dfa81ed327d37 (HEAD -> master)
Author: Adam Dabrowski <adam.dabrowski@outlook.com>
Date:   Fri Feb 10 14:48:42 2023 +0100

    fixup! Initial project setup with Next JS

commit e7d89ad218c966f88dc6fbd78075922030eb86f8 (origin/master, origin/HEAD)
Author: Adam Dabrowski <adam.dabrowski@outlook.com>
Date:   Tue Feb 7 17:08:00 2023 +0100

    Dump on master - working types

commit 97f9f3e5a58afbf948b54695cb7e4a4607e4b922
Author: Adam Dabrowski <adam.dabrowski@outlook.com>
Date:   Sun Nov 13 13:25:56 2022 +0100

    create Makefile

commit 5b2c99673754ef0f9d38ba595767ad7cd476653b
Author: Adam Dabrowski <adam.dabrowski@saucelabs.com>
Date:   Wed Nov 9 17:07:33 2022 +0100

    Lower nodejs version for Next

commit 68d3a1900458af8fa1e822bb5980663c12ff61a7
Author: Adam Dabrowski <adam.dabrowski@saucelabs.com>
Date:   Wed Nov 9 17:02:24 2022 +0100

    Initial project setup with Next JS
```

You can leave things as are but I recommend to clean it up in order to maintain the same list of commits. To do that run `git --interactive --autosquash COMMIT_ID~1`. In example, it would be `git rebase --interactive --autosquash 68d3a1900458af8fa1e822bb5980663c12ff61a7~1`. You will be prompted with git editor for rebasing.

```
pick 68d3a19 Initial project setup with Next JS
fixup b3397c9 fixup! Initial project setup with Next JS
pick 5b2c996 Lower nodejs version for Next
pick 97f9f3e create Makefile
pick e7d89ad Dump on master - working types

# Rebase 18672d9..b3397c9 onto 18672d9 (5 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified); use -c <commit> to reword the commit message
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#

```

Keep in mind that this rebase will change commit SHA, which is expected. After all, it has been modified and it's not the same commit, so it's SHA will be created again. So when you run `git log` the edited commit will show new SHA:

```
<OTHER COMMITS>

commit 82895c0a5999d66ef02d04bd308f8734f7fde10e
Author: Adam Dabrowski <adam.dabrowski@saucelabs.com>
Date:   Wed Nov 9 17:02:24 2022 +0100

    Initial project setup with Next JS

<OTHER COMMITS>
```
