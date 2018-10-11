//보일러플레이트 코드 (89)
import React, { Component } from 'react';
import { reduxForm }  from 'redux-form';        //connect 함수와 비슷
import { createPost } from '../actions/index';
import { Link } from 'react-router'; 

/*3. 액션 생생자를 컴포넌트를 전달
> 과거에는 connect로 전달
> 리덕스폼이 connect 역활 리덕스 폼이 액션 생성자를 컴포넌트에 주입, 컨테이너를 생성
창이점은 추가적 요소가 있음 >> 오브젝트 구성요소 
*/
class PostsNew extends Component {
    render() {
        //핼퍼
        const { fields: { title, categories, content }, handleSubmit } = this.props; //ES6
        // eq const handleSubmit = this.props.handleSubmit;
        // eq const title = this.props.fields.title;

       // console.log(title);
        //{/*이벤트 핸들러 handleSubmit : 리덕스 폼에게 유저가 이폼으로 제출 시도 밸리데이션 요청 */}
        //{/*formProps={... title}*/}
        //1 폼제출되몀 리덕스 폼이 인품 검증
        //2. 액션 생성자를 데이터와 함께 호출
        return (
            <form onSubmit={handleSubmit(this.props.createPost)}> 
                <h3>신규등록 post</h3>

                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>title</label>
                    <input type="text" className="form-control" {...title} />
                    <div className="text-help">{title.touched ? title.error : ''}</div>
                </div>

                <div className="form-group">
                    <label>categories</label>
                    <input type="text" className="form-control" {...categories} />
                    <div className="text-help">{categories.touched ? categories.error : ''}</div>
                </div>

                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                    <label>content</label>
                    <textarea className="form-control" {...content} />
                    <div className="text-help">{content.touched ? content.error : ''}</div>
                </div>

                <button type="submit" className="btn btn-primary">등록</button>   
                <Link to="/" className="btn btn-danger">취소</Link>                 
            </form>
        );
    }
}

//90. 폼검증 로우레벨( 자바스크립트 3항 연산자를 기준으로 touched [default:false] 함수를 이용하여 디폴드값을 설정 )
function validate(values){
    const errors = {};
    
    if(! values.title ){
        errors.title = '타이틀을 입력해주세요.';
    }

    if(! values.categories ){
        errors.categories = '카테고리즈 입력해주세요.';
    }

    if(! values.content ){
        errors.content = '컨텐츠를 입력해주세요.';
    }


    return errors;


}



//export default PostsNew;// connect(null, mapDispatchToProps)(PostsIndex);
//커넥트는   : [1. agurment mapStateToProps, 2.mapDispatchToprops]
//리덕스폼은 : [1. form config, 2. mapStateToProps 3. mapDispatchToprops]
export default reduxForm({
    form:   'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostsNew);
//{/* 1. form config 인풋이 글로벌 어플리케이션 스테이트로 세팅 */}

//유저 타이핑시 이것이 어플리케이션 스테이트에 저장되고 (forom 각 필드 프로퍼티로 작성 ) 아래참조
/*
state === {
    form : {
        PostsNewForm:{
            title: '...'
            ,categories: '...'
            ,content: '...'
        }
    }
}
*/