import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import forums from '../../apis/forums';
import { colorMainClassname } from './utils';

const ChallengeCreate = () => {
  const { accounts, seto } = useSelector((state) => ({
    accounts: state.accounts,
    seto: state.seto,
  }));
  // Redux

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    flag: '',
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
        isEmpty += Number(form[i] === '');
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
        flag: form.flag,
        problemType: form.questType,
        score: form.reward,
        tier: form.tier,
        title: form.title,
      };

      forums.post('/problems', betaFormData).then((res) => {
        console.log('업로드 성공');
        navigate('/challenge');
      });
    } else {
      console.log('폼을 마저 채우세요.');
    }
  };

  return (
    <main className={colorMainClassname[seto.theme]}>
      <div className="area" style={{ fontSize: '1.4rem' }}>
        <div className="main-post-challenge">
          <select name="questType" className="form-select" value={form.questType} onChange={(e) => onInputChange(e)}>
            <option disabled value="">
              문제 타입
            </option>
            <option value="FORENSIC">포렌식</option>
            <option value="REVERSING">리버싱</option>
            <option value="SYSTEM">시스템해킹</option>
            <option value="WEB">웹</option>
            <option value="MISC">기타</option>
          </select>
          <select name="tier" className="form-select" value={form.tier} onChange={(e) => onInputChange(e)}>
            <option disabled value="">
              티어
            </option>
            <option value="BRONZE">브론즈</option>
            <option value="SILVER">실버</option>
            <option value="GOLD">골드</option>
            <option value="PLATINUM">플레티넘</option>
            <option value="DIAMOND">다이아몬드</option>
          </select>
          <input type="text" className="form-input" name="title" placeholder="챌린지 제목" value={form.title} onChange={(e) => onInputChange(e)} />
          <input type="text" className="form-input" name="flag" placeholder="플래그 (정답)" value={form.flag} onChange={(e) => onInputChange(e)} />
          <input type="number" className="form-input" name="reward" placeholder="제공할 점수" value={form.reward} onChange={(e) => onInputChange(e)} />

          <textarea name="body" className="form-body" placeholder="문제 설명" value={form.body} onChange={(e) => onInputChange(e)}></textarea>
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

export default ChallengeCreate;
