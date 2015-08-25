#Sign Me Up!

Checks the William & Mary [Open Course List](https://courselist.wm.edu/courselist/) frequently to see if a closed class with a given CRN has opened and automagically registers you for it.


### Running (on Linux and OSX)

```
git clone https://github.com/kelvinabrokwa/sign-me-up.git
cd sign-me-up
npm install
pip install -r requirements.txt
```

Populate your env variables with the following:

```
export WM_USERNAME='<your_wm_username>'
export WM_PASSWORD='<your_wm_password>'
```

Next, schedule the job using cron by running the following command (note that this will remove all other scheduled jobs for the user. If you don't want to do this, manually edit your crontab by running `crontab -e` and appending the contents of [cron-file.txt](/cron-file.txt) to that file):


```sh
crontab cron-file.txt
```
