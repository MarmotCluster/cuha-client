import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import forums from '../../apis/forums';
import { colorMainClassname } from './utils';

const ChallengeEditSolution = () => {
  const { accounts, seto } = useSelector((state) => ({
    accounts: state.accounts,
    seto: state.seto,
  }));
  // Redux

  const { postId } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    flag: 'unset',
    reward: '',
    questType: '',
    tier: '',
    body: '',
  });

  const [formFiles, setFormFiles] = useState([]);

  const onInputChange = (e) => {
    setForm((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onAttachFile = (e) => {
    let _files = formFiles;
    _files.push(e.target.files[0]);
    // console.log(_files);

    setFormFiles([..._files]);
  };

  const onRemoveFile = (num) => {
    setFormFiles((state) => {
      let _files = state;
      _files = _files.filter((i, index) => index !== num);
      return _files;
    });
  };

  const renderIncludedFiles = () => {
    if (formFiles) {
      if (formFiles.length > 0) {
        return formFiles.map((i, index) => {
          return (
            <div key={index} className="form-files__item">
              <p className="form-files__item-title">{i.name}</p>
              <button type="button" className="form-files__item-btn__delete" onClick={() => onRemoveFile(index)}></button>
            </div>
          );
        });
      } else {
        return <p>첨부할 파일 없음.</p>;
      }
    }
  };

  const handlePost = () => {
    let validate = () => {
      let isEmpty = 0;
      Object.keys(form).forEach((i) => {
        if (i === 'body') isEmpty += Number(form[i] === '');
      });

      return isEmpty === 0 ? true : false;
    };

    if (validate()) {
      let formData = new FormData();
      let strings = new Blob([JSON.stringify(form)], { type: 'application/json' });

      formData.append('json', strings);
      formFiles.forEach((i, index) => {
        formData.append(`file${index}`, i);
      });

      let betaFormData = {
        body: form.body,
        // flag: form.flag,
        // problemType: form.questType,
        // score: form.reward,
        // tier: form.tier,
        // title: form.title,
      };

      forums.patch(`/problems/${postId}/solution`, betaFormData).then((res) => {
        console.log('수정 성공');
        navigate('/challenge');
      });
    } else {
      console.log('폼을 마저 채우세요.');
    }
  };

  useEffect(() => {
    forums.get(`/problems/${postId}/solution`).then((res) => {
      console.log('글 발견. 불러오기 완료', res.data);

      setForm((state) => ({
        ...state,
        title: res.data.title ? res.data.title : '',
        flag: res.data.flag ? res.data.flag : '',
        reward: res.data.score ? res.data.score : '',
        questType: res.data.problemType ? res.data.problemType : '',
        tier: res.data.tier ? res.data.tier : '',
        body: res.data.body ? res.data.body : '',
      }));
    });
  }, []);

  return (
    <main className={colorMainClassname[seto.theme]}>
      <div className="area" style={{ fontSize: '1.4rem' }}>
        <div className="main-post-challenge">
          <textarea
            name="body"
            className="form-body"
            placeholder={`문제 ${postId}에 대한 설명 작성`}
            value={form.body}
            onChange={(e) => onInputChange(e)}
            style={{ resize: 'none' }}
          ></textarea>
          <p style={{ padding: '1rem 0' }}>추가된 파일 ({`${formFiles.length}`} / 5):</p>

          <div className="form-files">{renderIncludedFiles()}</div>

          <div className="form-files-upload">
            {formFiles && formFiles.length < 5 ? <input type="file" name="files" onChange={(e) => onAttachFile(e)} /> : null}
            <p className="form-files-upload__title" style={{ opacity: formFiles && formFiles.length < 5 ? '1' : '0.5' }}>
              ...파일 추가...
            </p>
          </div>

          <button type="button" className="form-upload" onClick={() => handlePost()}>
            업로드
          </button>
        </div>
      </div>
      <div style={{ height: '5.8rem' }}></div>
    </main>
  );
};

export default ChallengeEditSolution;
