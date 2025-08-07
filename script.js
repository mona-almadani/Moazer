const nasirForm = document.getElementById('nasirForm');
const solutionDiv = document.getElementById('solution');
const problemDetails = document.getElementById('problemDetails');
const emergencyBtn = document.getElementById('emergencyBtn');

const detailedHelp = {
  medical: {
    emergencyNumber: '997',
    options: {
      نزيف: {
        advice: '🚑 إسعاف النزيف:\n- اضغط مباشرة على مكان النزيف\n- ارفع الجزء المصاب إن أمكن',
        steps: [
          'توقف عن النزيف بالضغط المباشر',
          'رفع الطرف المصاب إذا أمكن',
          'طلب المساعدة الطبية فوراً'
        ],
        centers: ['مستشفى السلامة', 'المراكز الصحية في الرياض']
      },
      إغماء: {
        advice: '🚑 إسعاف الإغماء:\n- تأكد من مجرى الهواء\n- ضع المصاب على جنبه',
        steps: [
          'افحص التنفس والنبض',
          'ضع المصاب على جانبه',
          'حافظ على هدوء المكان واطلب مساعدة إذا لم يستعد وعيه سريعاً'
        ],
        centers: ['مركز الطوارئ المحلي', 'عيادة الحوادث']
      },
      حروق: {
        advice: '🚑 إسعاف الحروق:\n- برّد المنطقة بماء بارد\n- لا تضع مراهم دون استشارة',
        steps: [
          'تبريد الحرق تحت ماء بارد لمدة 10 دقائق',
          'تغطية الحرق بضمادة نظيفة',
          'زيارة الطبيب للحروق العميقة أو الكبيرة'
        ],
        centers: ['مركز علاج الحروق', 'مستشفى الحريق الوطني']
      }
    }
  },
  mechanical: {
    emergencyNumber: '911',
    options: {
      السيارة_لا_تعمل: {
        advice: '🔧 السيارة لا تعمل:\n- تحقق من البطارية\n- جرب إعادة التشغيل بعد دقيقة',
        steps: [
          'افحص البطارية وتأكد من توصيلها',
          'حاول تشغيل السيارة بعد الانتظار قليلاً',
          'اطلب المساعدة من ميكانيكي مختص إذا استمرت المشكلة'
        ],
        centers: ['مركز صيانة السيارات السريع', 'ورشة الميكانيكي المتنقل']
      },
      إطار_مثقوب: {
        advice: '🔧 إطار مثقوب:\n- استبدل الإطار الاحتياطي\n- اطلب المساعدة إذا لم تستطع',
        steps: [
          'أوقف السيارة في مكان آمن',
          'استبدل الإطار المثقوب بالإطار الاحتياطي',
          'افحص الإطار المثقوب واصلحه أو استبدله'
        ],
        centers: ['ورشة تغيير الإطارات', 'خدمة المساعدة على الطريق']
      }
    }
  },
  psychological: {
    emergencyNumber: '123',
    options: {
      قلق: {
        advice: '🧠 القلق:\n- مارس التنفس العميق\n- تحدث مع شخص موثوق',
        steps: [
          'مارس تمارين التنفس والهدوء',
          'ابتعد عن المحفزات المزعجة',
          'اطلب الدعم النفسي من مختص إذا استمر القلق'
        ],
        centers: ['مركز الدعم النفسي', 'عيادة الصحة العقلية'],
        activities: ['ورش عمل اليوغا والتأمل', 'الانخراط في مجموعات الدعم']
      },
      اكتئاب: {
        advice: '🧠 الاكتئاب:\n- لا تتردد في طلب مساعدة متخصص\n- ابقَ نشطاً وشارك في نشاطات تحبها',
        steps: [
          'التحدث مع مستشار نفسي أو طبيب مختص',
          'المداومة على النشاطات البدنية والاجتماعية',
          'تجنب العزلة وحاول الانخراط في أنشطة مفيدة'
        ],
        centers: ['مركز علاج الاكتئاب', 'العيادات النفسية المتخصصة'],
        activities: ['المراكز الصيفية المجتمعية', 'ورش العمل الحرفية والفنية', 'أنشطة التطوع الاجتماعي']
      }
    }
  },
  legal: {
    emergencyNumber: null,
    options: {
      عقود: {
        advice: '⚖️ العقود:\n- اقرأ العقد بعناية\n- استشر محامي إذا كنت غير متأكد',
        steps: [
          'قراءة العقد بشكل كامل وبهدوء',
          'تحديد البنود الغامضة وطلب تفسيرها',
          'استشارة محامي مختص قبل التوقيع'
        ],
        centers: ['مكتب استشارات قانونية', 'جمعيات حماية المستهلك']
      },
      نزاعات: {
        advice: '⚖️ النزاعات:\n- حاول التفاوض بهدوء\n- احتفظ بجميع الأدلة والمراسلات',
        steps: [
          'جمع كافة الأدلة المتعلقة بالنزاع',
          'محاولة التفاوض والتوصل لحل ودي',
          'اللجوء للجهات القانونية إذا لم يتم الحل'
        ],
        centers: ['مراكز الوساطة القانونية', 'المحاكم المختصة']
      }
    }
  }
};

document.getElementById('problemType').addEventListener('change', (e) => {
  const type = e.target.value;
  problemDetails.innerHTML = '';
  emergencyBtn.style.display = 'none';
  solutionDiv.innerHTML = '';

  if (!type) {
    problemDetails.disabled = true;
    problemDetails.innerHTML = `<option value="">-- اختر نوع المشكلة أولاً --</option>`;
    return;
  }

  problemDetails.disabled = false;

  const opts = detailedHelp[type].options;
  for (const key in opts) {
    const option = document.createElement('option');
    // استبدال _ بمسافة وعرض الاسم بالعربي
    const displayText = key.replace(/_/g, ' ');
    option.value = key;
    option.textContent = displayText;
    problemDetails.appendChild(option);
  }

  problemDetails.value = '';

  if (detailedHelp[type].emergencyNumber) {
    emergencyBtn.style.display = 'block';
    emergencyBtn.onclick = () => {
      window.open(`tel:${detailedHelp[type].emergencyNumber}`, '_self');
    };
  } else {
    emergencyBtn.style.display = 'none';
  }
});

nasirForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const type = document.getElementById('problemType').value;
  const detail = document.getElementById('problemDetails').value;

  if (!type) {
    solutionDiv.textContent = 'يرجى اختيار نوع المشكلة';
    return;
  }
  if (!detail) {
    solutionDiv.textContent = 'يرجى اختيار تفاصيل المشكلة';
    return;
  }

  const problemData = detailedHelp[type].options[detail];
  if (!problemData) {
    solutionDiv.textContent = 'لا توجد تفاصيل متوفرة';
    return;
  }

  const stepsHtml = problemData.steps.map(step => `<li>${step}</li>`).join('');
  const centersHtml = problemData.centers ? problemData.centers.map(center => `<li>${center}</li>`).join('') : 'لا توجد مراكز محددة';
  const activitiesHtml = problemData.activities ? problemData.activities.map(act => `<li>${act}</li>`).join('') : null;

  solutionDiv.innerHTML = `
    <h3>نتيجة المساعدة:</h3>
    <table border="1" cellpadding="10" cellspacing="0" style="width:100%; border-collapse: collapse; text-align: right; direction: rtl;">
      <tr style="background-color: #0277bd; color: white;">
        <th style="width: 20%;">نوع المشكلة</th>
        <th style="width: 30%;">التفصيل</th>
        <th style="width: 50%;">التفاصيل</th>
      </tr>
      <tr>
        <td>${type.charAt(0).toUpperCase() + type.slice(1)}</td>
        <td>${detail.replace(/_/g, ' ')}</td>
        <td>
          <strong>النصائح:</strong>
          <p style="white-space: pre-line; margin: 4px 0 8px 0;">${problemData.advice}</p>

          <strong>خطة العلاج أو الخطوات:</strong>
          <ul style="margin-top: 4px; margin-bottom: 8px;">${stepsHtml}</ul>

          <strong>المراكز أو الأماكن المساعدة:</strong>
          <ul style="margin-top: 4px; margin-bottom: 8px;">${centersHtml}</ul>

          ${activitiesHtml ? `<strong>أنشطة مقترحة:</strong><ul style="margin-top: 4px; margin-bottom: 0;">${activitiesHtml}</ul>` : ''}
        </td>
      </tr>
    </table>
  `;
});
