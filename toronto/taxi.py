import pyarrow.parquet as pq
import pandas as pd

path = 'C:\\Users\\alexq\\Downloads\\archive\\Dataset\\2023\\yellow_taxi\\yellow_tripdata_2023-03.parquet'
table = pq.read_table(path)

df = table.to_pandas()
print(df[['PULocationID', 'DOLocationID']])

columns_list = df.columns.tolist()
print(columns_list)
