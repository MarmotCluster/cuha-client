import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { colorMainClassname } from './utils';

const PostEdit = (props) => {
    const { accounts, seto } = useSelector((state) => ({
        accounts: state.accounts,
        seto: state.seto,
    }));

    // REDUX

    const { postId } = useParams();

    const ref = useRef([]);

    const [submitAttempt, setSubmitAttempt] = useState(0);

    const [form, setForm] = useState({
        title: '',
        category: 'none',
        content: '',
    });

    const [err, setErr] = useState({
        title: 0,
        category: 0,
        content: 0,
    });

    const setForms = (e) => {
        setForm((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const handleValidation = () => {
        let { title, category } = form;

        title.length === 0 ? setErr((state) => ({ ...state, title: 1 })) : setErr((state) => ({ ...state, title: 0 }));
        category === 'none'
            ? setErr((state) => ({ ...state, category: 1 }))
            : setErr((state) => ({ ...state, category: 0 }));

        setSubmitAttempt((state) => state + 1);

        // after update error states...

        if (err.title === 1) {
            ref.current[0].focus();
        } else {
            if (err.category === 1) {
                ref.current[1].focus();
            }
        }
    };

    useEffect(() => {
        if (submitAttempt > 0) {
            console.log(err);
            // console.log(form);
            let _errorCount = Object.keys(err).filter((i) => err[i] > 0);
            // console.log(_errorCount);
            if (_errorCount.length === 0) {
                console.log(_errorCount, '전송 이벤트 시작');
            }
        }
    }, [submitAttempt, err]);

    const renderDocumentEditor = () => {
        return (
            <div className="main-posts">
                <div className="area">
                    <section className="section-posttitle" style={{ flexDirection: 'column' }}>
                        <input
                            ref={(r) => (ref.current[0] = r)}
                            type="text"
                            name="title"
                            className="title-input"
                            onChange={(e) => setForms(e)}
                            placeholder="제목을 입력하세요."
                        />
                        <p className={`input-error ${err.title ? '' : 'input-error-hide'}`}>입력란이 비었습니다.</p>
                    </section>
                    <section className="section-postinfo" style={{ justifyContent: 'flex-start' }}>
                        <div>
                            {/* <Link className="section-postinfo__link" to="/board/free">
                                자유게시판
                            </Link> */}
                            <select
                                ref={(r) => (ref.current[1] = r)}
                                name="category"
                                value={form.category}
                                onChange={(e) => setForms(e)}
                                className="section-postinfo__select"
                            >
                                <option value="none" style={{ display: 'none' }}>
                                    카테고리 선택
                                </option>
                                <option value="notice">공지사항</option>
                                <option value="free">자유게시판</option>
                                <option value="question">질문게시판</option>
                            </select>
                        </div>
                        <p className={`input-error ${err.category ? '' : 'input-error-hide'}`}>
                            카테고리를 설정해 주세요.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            {/* <Link className="section-postinfo__link" to="/member/root">
                                김감각
                            </Link>
                            <p className="section-postinfo__date">2022-02-22</p>
                            <p className="section-postinfo__commentcount">10</p> */}
                        </div>
                    </section>
                    <section className="section-post">
                        {/* <div dangerouslySetInnerHTML={{ __html: `<p style="color: red">hello world</p>` }}></div> */}
                        <textarea name="contents" style={{ width: '100%', height: '80vh', resize: 'none' }}></textarea>
                    </section>

                    <section className="section-posttool">
                        <button className="button-positive" type="button" onClick={() => handleValidation()}>
                            등록
                        </button>
                    </section>

                    <div style={{ height: '5.8rem' }}></div>
                </div>
            </div>
        );
    };

    return <main className={colorMainClassname[seto.theme]}>{renderDocumentEditor()}</main>;
};

export default PostEdit;
