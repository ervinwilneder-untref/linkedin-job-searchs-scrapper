import json
import pandas as pd

f = open('downloads/response.json')
response = json.load(f)

df = pd.DataFrame(response).explode('jobSearchs')
df = pd.concat([df, df['jobSearchs'].apply(pd.Series)], axis=1)
df.drop(columns=['jobSearchs'], inplace=True)
df.dropna(inplace=True)
df['info'] = df['info'].apply(lambda x: x[:-2])
df['info'] = df['info'].apply(lambda x: dict(company=x[0], location=x[1]) if (len(x) == 2) else dict(company='', location=x[0]))
df = pd.concat([df, df['info'].apply(pd.Series)], axis=1)
df.drop(columns=['info'], inplace=True)
df = df.reset_index().drop(columns=['index'])
df.to_csv('data.csv', index=False, mode='a', header=False)