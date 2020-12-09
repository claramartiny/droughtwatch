FROM python:3.8.6-buster

COPY requirements.txt /requirements.txt

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY api /api
COPY droughtwatch /droughtwatch

CMD streamlit run api/app.py --server.address 0.0.0.0 --server.port 80