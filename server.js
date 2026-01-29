const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
function calculateBMI(height, weight) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return parseFloat(bmi.toFixed(2));
}
function getBMICategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi >= 18.5 && bmi < 25) return 'Normal';
  if (bmi >= 25 && bmi < 30) return 'Overweight';
  return 'Obese';
}
function analyzeBP(bp) {
  const [systolic, diastolic] = bp.split('/').map(Number);
  
  if (systolic < 120 && diastolic < 80) {
    return { status: 'Normal', message: 'Blood pressure is within normal range' };
  } else if (systolic >= 140 || diastolic >= 90) {
    return { status: 'High', message: 'High blood pressure detected - consult a doctor' };
  } else {
    return { status: 'Elevated', message: 'Blood pressure is slightly elevated' };
  }
}
function analyzeSugar(sugar) {
  if (sugar < 100) {
    return { status: 'Normal', message: 'Blood sugar level is normal' };
  } else if (sugar >= 100 && sugar < 126) {
    return { status: 'High', message: 'Prediabetic range - monitor your sugar intake' };
  } else {
    return { status: 'High', message: 'Diabetic range - immediate medical attention needed' };
  }
}
function analyzePulse(pulse) {
  if (pulse < 60) {
    return { status: 'Low', message: 'Pulse rate is below normal - bradycardia' };
  } else if (pulse >= 60 && pulse <= 100) {
    return { status: 'Normal', message: 'Pulse rate is within normal range' };
  } else {
    return { status: 'High', message: 'Pulse rate is elevated - tachycardia' };
  }
}
function getFoodRecommendations(analysis) {
  const recommendations = [];
  if (analysis.bmi.category === 'Underweight') {
    recommendations.push('🥑 Increase calorie intake with nutrient-dense foods like nuts, avocados, and whole grains');
    recommendations.push('🥛 Include protein-rich foods: eggs, lean meats, dairy products, and legumes');
    recommendations.push('🍌 Eat frequent small meals throughout the day with healthy snacks');
  } else if (analysis.bmi.category === 'Overweight' || analysis.bmi.category === 'Obese') {
    recommendations.push('🥗 Focus on vegetables, fruits, and lean proteins with portion control');
    recommendations.push('🚫 Avoid processed foods, sugary drinks, and excessive carbohydrates');
    recommendations.push('🍎 Choose whole grains over refined grains and limit saturated fats');
  } else {
    recommendations.push('🥗 Maintain balanced diet with vegetables, fruits, proteins, and whole grains');
    recommendations.push('💧 Stay hydrated with 8-10 glasses of water daily');
  }
  if (analysis.bloodPressure.status === 'High' || analysis.bloodPressure.status === 'Elevated') {
    recommendations.push('🧂 Reduce sodium intake - avoid processed and packaged foods');
    recommendations.push('🍌 Increase potassium-rich foods: bananas, spinach, sweet potatoes');
    recommendations.push('🫒 Include heart-healthy fats from olive oil, nuts, and fatty fish');
  }
  if (analysis.bloodSugar.status === 'High') {
    recommendations.push('🌾 Choose low glycemic index foods: oats, quinoa, legumes, and non-starchy vegetables');
    recommendations.push('🍬 Eliminate refined sugars, white bread, and sugary beverages');
    recommendations.push('🥜 Include fiber-rich foods and healthy fats to stabilize blood sugar');
  }
  
  return recommendations;
}
function getExerciseRecommendations(analysis) {
  const recommendations = [];
  recommendations.push('🏃 Aim for 150 minutes of moderate aerobic activity per week');
  recommendations.push('💪 Include strength training exercises 2-3 times per week');
  if (analysis.bmi.category === 'Underweight') {
    recommendations.push('🏋️ Focus on resistance training to build muscle mass');
    recommendations.push('🚶 Light cardio like walking or swimming to improve appetite');
  } else if (analysis.bmi.category === 'Overweight' || analysis.bmi.category === 'Obese') {
    recommendations.push('🚴 Low-impact cardio: cycling, swimming, or brisk walking');
    recommendations.push('🔥 Gradually increase intensity to burn calories safely');
    recommendations.push('⏱️ Start with 30 minutes daily and increase duration progressively');
  }
  if (analysis.bloodPressure.status === 'High' || analysis.bloodPressure.status === 'Elevated') {
    recommendations.push('🧘 Practice stress-reducing exercises like yoga and tai chi');
    recommendations.push('🏊 Swimming and water aerobics are excellent for BP management');
  }
  if (analysis.pulse.status === 'High') {
    recommendations.push('🫁 Include breathing exercises and meditation to lower resting heart rate');
    recommendations.push('⚠️ Avoid high-intensity workouts until pulse normalizes');
  }
  
  return recommendations;
}
function getYogaRecommendations(analysis) {
  const recommendations = [];
  recommendations.push('🧘‍♀️ Practice Pranayama (breathing exercises) for 10-15 minutes daily');
  recommendations.push('😴 Ensure 7-8 hours of quality sleep each night');
  recommendations.push('🧠 Practice meditation for stress management and mental clarity');
  if (analysis.bloodPressure.status === 'High' || analysis.bloodPressure.status === 'Elevated') {
    recommendations.push('🕉️ Shavasana (Corpse Pose) - excellent for relaxation and BP reduction');
    recommendations.push('🌬️ Anulom Vilom (Alternate Nostril Breathing) - balances nervous system');
    recommendations.push('🧘 Sukhasana (Easy Pose) with deep breathing - calms mind and body');
  }
  if (analysis.bloodSugar.status === 'High') {
    recommendations.push('🦅 Bhujangasana (Cobra Pose) - stimulates pancreatic function');
    recommendations.push('🔄 Dhanurasana (Bow Pose) - improves insulin sensitivity');
    recommendations.push('🌅 Practice yoga early morning on empty stomach for better results');
  }
  if (analysis.bmi.category === 'Overweight' || analysis.bmi.category === 'Obese') {
    recommendations.push('☀️ Surya Namaskar (Sun Salutation) - 12 rounds daily for weight loss');
    recommendations.push('🔥 Kapalbhati Pranayama - boosts metabolism and burns calories');
  }
  if (analysis.pulse.status === 'High') {
    recommendations.push('🌊 Sheetali Pranayama (Cooling Breath) - reduces heart rate and anxiety');
    recommendations.push('🎵 Practice yoga nidra for deep relaxation and nervous system balance');
  }
  recommendations.push('🚭 Avoid smoking and limit alcohol consumption');
  recommendations.push('📱 Reduce screen time before bed for better sleep quality');
  recommendations.push('👥 Maintain social connections and engage in hobbies for mental health');
  
  return recommendations;
}
function getOverallHealthStatus(analysis) {
  let riskFactors = 0;
  if (analysis.bmi.category === 'Obese') riskFactors += 2;
  else if (analysis.bmi.category === 'Overweight' || analysis.bmi.category === 'Underweight') riskFactors += 1;
  
  if (analysis.bloodPressure.status === 'High') riskFactors += 2;
  else if (analysis.bloodPressure.status === 'Elevated') riskFactors += 1;
  
  if (analysis.bloodSugar.status === 'High') riskFactors += 2;
  
  if (analysis.pulse.status === 'High' || analysis.pulse.status === 'Low') riskFactors += 1;
  if (riskFactors === 0) return 'Healthy';
  if (riskFactors <= 2) return 'Moderate Risk';
  return 'Critical Risk';
}
function getMetricCounts(analysis) {
  let normal = 0, high = 0, low = 0;
  if (analysis.bmi.category === 'Normal') normal++;
  else if (analysis.bmi.category === 'Underweight') low++;
  else high++;
  if (analysis.bloodPressure.status === 'Normal') normal++;
  else high++;
  if (analysis.bloodSugar.status === 'Normal') normal++;
  else high++;
  if (analysis.pulse.status === 'Normal') normal++;
  else if (analysis.pulse.status === 'Low') low++;
  else high++;
  
  return { normal, high, low };
}
app.get('/', (req, res) => {
  res.json({ 
    message: 'Healthcare Management System API',
    status: 'Active',
    version: '1.0.0',
    endpoints: ['/health/analyze']
  });
});
app.post('/health/analyze', (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      email,
      phone,
      height,
      weight,
      bloodPressure,
      bloodSugar,
      pulse
    } = req.body;
    if (!height || !weight || !bloodPressure || !bloodSugar || !pulse) {
      return res.status(400).json({
        success: false,
        error: 'Missing required health metrics'
      });
    }
    const bmi = calculateBMI(height, weight);
    const bmiCategory = getBMICategory(bmi);
    const bpAnalysis = analyzeBP(bloodPressure);
    const sugarAnalysis = analyzeSugar(bloodSugar);
    const pulseAnalysis = analyzePulse(pulse);
    const analysis = {
      bmi: {
        value: bmi,
        category: bmiCategory
      },
      bloodPressure: bpAnalysis,
      bloodSugar: sugarAnalysis,
      pulse: pulseAnalysis
    };
    const metricCounts = getMetricCounts(analysis);
    const overallStatus = getOverallHealthStatus(analysis);
    const recommendations = {
      food: getFoodRecommendations(analysis),
      exercise: getExerciseRecommendations(analysis),
      yoga: getYogaRecommendations(analysis)
    };
    const response = {
      success: true,
      patient: {
        name,
        age,
        gender,
        email,
        phone
      },
      metrics: {
        height,
        weight,
        bloodPressure,
        bloodSugar,
        pulse
      },
      analysis,
      overallStatus,
      chartData: metricCounts,
      recommendations,
      timestamp: new Date().toISOString()
    };
    console.log(`Health analysis completed for ${name} - Status: ${overallStatus}`);
    res.json(response);
  } catch (error) {
    console.error('Error in health analysis:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during health analysis'
    });
  }
});
app.listen(PORT, () => {
  console.log('===========================================');
  console.log('Healthcare Management System - Backend');
  console.log('===========================================');
  console.log(`Server Status: Running`);
  console.log(`Port: ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Endpoint: http://localhost:${PORT}/health/analyze`);
  console.log('===========================================');
});
