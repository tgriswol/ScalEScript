var ju = jsUnity.assertions;

var testSuite = {
	suiteName: "Eval and Parser tests",
	// setUp: function() {},
	// tearDown: function() {},
	
	testEval1: function() {
		var e = Sum(Product(Constant(4), Constant(8)), Difference(Constant(12), Constant(2)));
		ju.assertIdentical(42, Expression.eval(e));
	},
	
	/*
	// The following two are just to test the test runner...
	testEval2: function() {
	    ju.assertIdentical(2+2, 4);
	},
	
	testFail: function() {
		ju.fail();
	},
	*/
	
	testKeywordParser: function() {
	    var r = new RegexParsers();
	    var p = r.keyword("test");
	    ju.assertIdentical("Success(test, ing)", p.app("testing").toString());
	},
	
	testRegexParser: function() {
	    var r = new RegexParsers();
	    var p = r.regex(/[1-9]\d*|0/);
	    ju.assertIdentical("Success(23, skidoo)", p.app("23skidoo").toString());
	},
	
	testRegexParser2: function() {
	    var r = new RegexParsers();
	    var p = r.regex(/[1-9]\d*|0/);
	    ju.assertIdentical("Success(0, 123skidoo)", p.app("0123skidoo").toString());
	},
	
	testRegexParser3: function() {
	    var r = new RegexParsers();
	    var p = r.regex(/[1-9]\d*|0/);
	    ju.assertIdentical("Failure(Expected '/[1-9]\\d*|0/' got 'testing')", p.app("testing").toString());
	},
	
	testSeqParser: function() {
	    var r = new RegexParsers();
	    var p = r.keyword("test")["~"](function() {return r.regex(/[1-9]\d*|0/);});
	    ju.assertIdentical("Success(test~123, )", p.app("test123").toString());
	},
	
	testExprParser: function() {
	    var p = ExprParser.expr();
	    ju.assertIdentical("Success(Sum(Constant(2), Constant(2)), )", p.app("2+2").toString());
	},
	
	testExprParser2: function() {
	    var p = ExprParser.expr();
	    ju.assertIdentical("Success(Sum(Product(Constant(4), Constant(8)), Difference(Constant(12), Constant(2))), )",
	        p.app("4*8+(12-2)").toString());
	},
	
	testExprParser3: function() {
	    var p = ExprParser.expr();
	    ju.assertIdentical("Success(Sum(Difference(Constant(12), Constant(2)), Product(Constant(4), Constant(8))), )",
	        p.app("12-2+4*8").toString());
	},
	
	testExprParser4: function() {
	    var p = ExprParser.expr();
	    ju.assertIdentical(42, Expression.eval(p.app("12-2+4*8").value));
	},
	
	testLazy: function() {
	    var x = 0;
	    var z = Lazy(function() {
	        x = x + 1;
	        return x;
	    });
	    ju.assertIdentical(0, x);
	    ju.assertIdentical(2, z() + z());
	    ju.assertIdentical(1, x);
	}
};
