FROM python:3.8.6-buster

COPY api /api
COPY droughtwatch /droughtwatch
COPY requirements.txt /requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD streamlit run api/app.py --server.address 0.0.0.0 --server.port $PORT