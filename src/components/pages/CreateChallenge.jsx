import React from 'react';
import { useSelector } from 'react-redux';
import { colorMainClassname } from './utils';

const CreateChallenge = () => {
  const { accounts, seto } = useSelector((state) => ({
    accounts: state.accounts,
    seto: state.seto,
  }));
  // Redux

  const [form, setForm] = React.useState({
    title: '',
    flag: '',
    reward: '',
    questType: '',
    tier: '',
    body: '',
    files: [],
  });

  const onInputChange = (e) => {
    setForm((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onAttachFile = (e) => {
    setForm((state) => {
      let _files = state.files;

      _files.push(e.target.files[0]);
      console.log(e.target.files[0]);

      return {
        ...state,
        files: _files,
      };
    });

    // e.target.value = '';
  };

  const onRemoveFile = (num) => {
    setForm((state) => {
      let _files = state.files;

      _files = _files.filter((i, index) => index !== num);

      return {
        ...state,
        files: _files,
      };
    });
  };

  const renderIncludedFiles = () => {
    if (form.files) {
      if (Object.keys(form.files).length > 0) {
        return form.files.map((i, index) => {
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

  return (
    <main className={colorMainClassname[seto.theme]}>
      <div className="area" style={{ fontSize: '1.4rem' }}>
        <div className="main-post-challenge">
          <input type="text" className="form-input" name="title" placeholder="챌린지 제목" value={form.title} onChange={(e) => onInputChange(e)} />
          <input type="text" className="form-input" name="flag" placeholder="플래그 (정답)" value={form.flag} onChange={(e) => onInputChange(e)} />
          <input type="number" className="form-input" name="reward" placeholder="제공할 점수" value={form.reward} onChange={(e) => onInputChange(e)} />
          <select name="questType" className="form-select" value={form.questType} onChange={(e) => onInputChange(e)}>
            <option disabled value="">
              문제 타입
            </option>
            <option value="forensic">포렌식</option>
            <option value="reversing">리버싱</option>
            <option value="syshacking">시스템해킹</option>
            <option value="web">웹</option>
            <option value="misc">기타</option>
          </select>
          <select name="tier" className="form-select" value={form.tier} onChange={(e) => onInputChange(e)}>
            <option disabled value="">
              티어
            </option>
            <option value="bronze">브론즈</option>
            <option value="silver">실버</option>
            <option value="gold">골드</option>
            <option value="platinum">플레티넘</option>
            <option value="diamond">다이아몬드</option>
          </select>
          <textarea name="body" className="form-body" placeholder="문제 설명" value={form.body} onChange={(e) => onInputChange(e)}></textarea>
          <p style={{ padding: '1rem 0' }}>추가된 파일 ({`${Object.keys(form.files).length}`} / 5):</p>

          <div className="form-files">{renderIncludedFiles()}</div>

          <div className="form-files-upload">
            {form.files && Object.keys(form.files).length < 5 ? <input type="file" name="files" onChange={(e) => onAttachFile(e)} /> : null}
            <p className="form-files-upload__title" style={{ opacity: form.files && Object.keys(form.files).length < 5 ? '1' : '0.5' }}>
              ...파일 추가...
            </p>
          </div>

          <button type="button" className="form-upload">
            업로드
          </button>
        </div>
      </div>
      <div style={{ height: '5.8rem' }}></div>
    </main>
  );
};

export default CreateChallenge;
