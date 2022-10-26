import useManage from "../src/hooks/useManage"

/*
 *  미완성 
 */

const Manage=()=>{

    const {isLogined}=useManage()

    if(!isLogined){
        return(
            <div>
                해당 페이지는 로그인이 필요합니다.
            </div>
        )
    }

    return(
        <div>
            <div>
                <h4>카테고리 관리</h4>
                <ul>
                    <li>카테고리 목록</li>
                </ul>
                <div>
                    제목:<input type={'text'}></input>
                    슬러그:<input type={'text'}></input>
                </div>
            </div>
            <div>
                포스트 관리 (select 로 카테고리 정하면 목록 보여주기)
            </div>
        </div>
    )
}

export default Manage