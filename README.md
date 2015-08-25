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

Next, schedule the job using cron

```sh
crontab -e
```

Add the following line to your crontab file:

```sh
*/3 * * * * ~/ABSOLUTE_PATH_TO_THIS_REPO/run.sh <YOUR_CLASS_CRN>
```

And then save and exit (this will check the courselist every 3 minutes).
