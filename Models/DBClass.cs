using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AIWeb.Models
{
    public class DBClass
    {
    }
    public class TRAINING {
        public string TrainNO { get; set; }
        public string UserName { get; set; }
        public string TaskName { get; set; }
        public string BatchSize { get; set; }
        public string DEEPS { get; set; }
        public string ALGORITHMNO { get; set; }
        public string PATH { get; set; }
        public string STATUS { get; set; }
        public string CREATETIME { get; set; }
        public string UPDATETIME { get; set; }    
    }
    public class TESTING
    {
        public string TestNO { get; set; }
        public string UserName { get; set; }
        public string TaskName { get; set; }
        public string TrainNO { get; set; }
        public string PATH { get; set; }
        public string ALGORITHMNO { get; set; }
        public string STATUS { get; set; }
        public string CREATETIME { get; set; }
        public string UPDATETIME { get; set; }
        public string RESULT { get; set; }
    }
}