# Data analysis
- Description: This project leverages deep learning and computer vision for
drought resilience, using satellite images and human expert labels to detect
drought conditions in Northern Kenya.

- Data Source: USGS Landsat 8 Collection 1 Tier 1 and Real-Time data Raw Scenes

- Type of analysis:

- Dataset:
The current dataset consists of 86,317 train and 10,778 validation satellite
images, 65x65 pixels each, in 10 spectrum bands, with 10,774 images withheld to
test long-term generalization (107,869 total). Human experts (pastoralists) have
labeled these with the number of cows that the geographic location at the
center of the image could support (0, 1, 2, or 3+ cows).Each pixel represents a
30 meter square, so the images at full size are 1.95 kilometers across.
Pastoralists are asked to rate the quality of the area within 20 meters of where
they are standing, which corresponds to an area slightly larger a single pixel.
Since forage quality is correlated across space, the larger image may be useful
for prediction.

The data is in TFRecords format, split into train and val, and takes up 4.3GB
(2.15GB zipped). You can learn more about the format of the satellite images here:
https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LC08_C01_T1_RT


# Startup the project

The initial setup.

Create virtualenv and install the project:
```bash
  $ sudo apt-get install virtualenv python-pip python-dev
  $ deactivate; virtualenv ~/venv ; source ~/venv/bin/activate ;\
    pip install pip -U; pip install -r requirements.txt
```

Unittest test:
```bash
  $ make clean install test
```

Check for droughtwatch in gitlab.com/{group}.
If your project is not set please add it:

- Create a new project on `gitlab.com/{group}/droughtwatch`
- Then populate it:

```bash
  $ ##   e.g. if group is "{group}" and project_name is "droughtwatch"
  $ git remote add origin git@gitlab.com:{group}/droughtwatch.git
  $ git push -u origin master
  $ git push -u origin --tags
```

Functionnal test with a script:
```bash
  $ cd /tmp
  $ droughtwatch-run
```
# Install
Go to `gitlab.com/{group}/droughtwatch` to see the project, manage issues,
setup you ssh public key, ...

Create a python3 virtualenv and activate it:
```bash
  $ sudo apt-get install virtualenv python-pip python-dev
  $ deactivate; virtualenv -ppython3 ~/venv ; source ~/venv/bin/activate
```

Clone the project and install it:
```bash
  $ git clone gitlab.com/{group}/droughtwatch
  $ cd droughtwatch
  $ pip install -r requirements.txt
  $ make clean install test                # install and test
```
Functionnal test with a script:
```bash
  $ cd /tmp
  $ droughtwatch-run
```
