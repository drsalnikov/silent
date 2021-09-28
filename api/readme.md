## API

**1. Получение одной записи по ID. Данные возвращаются в формате JSON.**    
   /itProc/:id   
   /factor/:id  
   /activity/:id  
   /factorRisk/:id  
   /risk/:id  
   /riskbyprocess/:id    
   /factorRiskByRisk/:id    
   /activitybyfactor/:id  

   Пример возвращаемого значения:  
```JSON
[
  {
    "ID": 1,
    "Name": "Информирование заинтересованных сторон оперативной информацией",
    "RTO": 2,
    "Level": "Критический"
  }
]
```

**2. Получение всех данных из таблицы**  
    /itProcAll  
    /factorsAll  
    /activityAll  
    /factorsRiskAll  
    /reductionAll  
    /riskAll  
    /resultAll  

   Пример возвращаемого значения:  
```JSON
[
  {
    "ID": 1,
    "Name": "Информирование заинтересованных сторон оперативной информацией",
    "RTO": 2,
    "Level": "Критический"
  },
  {
    "ID": 2,
    "Name": "Обмен данными",
    "RTO": 22,
    "Level": "Критический"
  },
  {
    "ID": 3,
    "Name": "Инструменты формирования отчетности",
    "RTO": 48,
    "Level": "Некритический"
  },  
]
```
