
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

# 메모
class Memo(BaseModel):
    id:int
    content:str

memos = []

# 추가
@app.post('/memo')
def create_memo(memo:Memo):
    memos.append(memo)
    return "OK 201 Created"

# 조회
@app.get('/memos')
def read_memos():
    return memos

# 수정
@app.put('/memo/{memo_id}')
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id == req_memo.id:
            memo.content = req_memo.content
            return '성공했습니다'
    return '그런 메모는 없습니다.'

# 삭제
@app.delete('/memo/{memo_id}')
def delete_memo(memo_id):
    memo_id = int(memo_id)
    for index,memo in enumerate(memos):
        print(memo_id, memo.id, memo_id == memo.id)
        if memo.id == memo_id:
            memos.pop(index)
            return '성공했습니다'
    return '그런 메모는 없습니다.'

# static 경로에 있는 파일을 사용할 예정
app.mount("/", StaticFiles(directory="static", html=True), name="static")
