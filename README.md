#Sign Me Up!

Checks the William & Mary [Open Course List](https://courselist.wm.edu/courselist/) to see if a closed class has opened up and automagically registers you for it.

### Running (on Linux and OSX)

#### Installing

**Dependencies**

 - [Node.js](https://nodejs.org/en/)
 - [Python 2.7](https://www.python.org/download/releases/2.7/)
 - [Cron](https://en.wikipedia.org/wiki/Cron)

```
git clone https://github.com/kelvinabrokwa/sign-me-up.git
cd sign-me-up
npm install
pip install -r requirements.txt
```

Add the `WM_USERNAME` and `WM_PASSWORD` credentials your env variables to enable logging into Banner:

```
export WM_USERNAME='<your_wm_username>'
export WM_PASSWORD='<your_wm_password>'
```

#### `run.sh`

[`run.sh`](https://github.com/kelvinabrokwa/sign-me-up/blob/master/run.sh) is the main entry point. The following flags are required:

 - `-s`: The semester code you're registering for. Fall 2015 is `201610` and Spring 2016 is `201620`.
 - `-c`: The CRN of the class you want.

Example:

```
./run.sh -s 201620 -c 24819
```

The command above will check if CSCI 303 in Spring 2016 is open and if it is, it will register you for it. You may follow the instructions below to run this at some regular interval.


#### Edit [cron-file.txt](/cron-file.txt)

- Add the correct path to [run.sh](/run.sh) in place of `<ABSOLUTE_PATH_TO_THIS_REPO>`
- Add your desired semester in place of `<SEMESTER_CODE>`.
- Add your desired CRN in place of `<CLASS_CRN>`.
- You can also change how frequently you check for updates (it is currently set to check every 3 minutes, see [this article](http://www.thegeekstuff.com/2009/06/15-practical-crontab-examples/) for cron syntax).

#### Schedule the job

Run the following command (note that this will remove all other scheduled jobs for the user. If you don't want to do this, manually edit your crontab by running `crontab -e` and appending the contents of [cron-file.txt](/cron-file.txt) to that file):


```sh
crontab cron-file.txt
```

Sample job:
```
*/3 * * * * ~/sign-me-up/run.sh -s 201620 -c 24819
```
The above will check for CSCI 303 availability every 3 minutes. Make sure to use the absolute path to `run.sh`.
