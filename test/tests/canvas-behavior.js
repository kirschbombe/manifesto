var expect = require('chai').expect;
var should = require('chai').should();
var manifesto = require('../../dist-commonjs/');
var manifests = require('../fixtures/manifests');
var Behavior = require('@iiif/vocabulary/dist-commonjs/').Behavior;

var nonPagedManifest;
var facingPagesManifest;
var avManifest;

describe('#canvasBehavior', function() {

    describe('non-paged canvas in a paged manifest', function() {

        it('loads successfully', function(done) {
            manifesto.loadManifest(manifests.canvasBehaviorNonPaged).then(function(data) {
                nonPagedManifest = manifesto.parseManifest(data);
                done();
            });
        });

        it('manifest has paged behavior', function() {
            nonPagedManifest.getBehavior().should.equal(Behavior.PAGED);
        });

        it('front cover has no canvas behavior', function() {
            var canvas = nonPagedManifest.getSequenceByIndex(0).getCanvasByIndex(0);
            expect(canvas.getBehavior()).to.be.null;
        });

        it('front cover getBehaviors returns empty array', function() {
            var canvas = nonPagedManifest.getSequenceByIndex(0).getCanvasByIndex(0);
            canvas.getBehaviors().should.deep.equal([]);
        });

        it('foldout canvas has non-paged behavior', function() {
            var canvas = nonPagedManifest.getSequenceByIndex(0).getCanvasByIndex(3);
            canvas.getBehavior().should.equal(Behavior.NON_PAGED);
        });

        it('foldout canvas getBehaviors returns non-paged', function() {
            var canvas = nonPagedManifest.getSequenceByIndex(0).getCanvasByIndex(3);
            canvas.getBehaviors().should.deep.equal([Behavior.NON_PAGED]);
        });
    });

    describe('facing-pages canvas in a paged manifest', function() {

        it('loads successfully', function(done) {
            manifesto.loadManifest(manifests.canvasBehaviorFacingPages).then(function(data) {
                facingPagesManifest = manifesto.parseManifest(data);
                done();
            });
        });

        it('manifest has paged behavior', function() {
            facingPagesManifest.getBehavior().should.equal(Behavior.PAGED);
        });

        it('front cover has no canvas behavior', function() {
            var canvas = facingPagesManifest.getSequenceByIndex(0).getCanvasByIndex(0);
            expect(canvas.getBehavior()).to.be.null;
        });

        it('spread canvas has facing-pages behavior', function() {
            var canvas = facingPagesManifest.getSequenceByIndex(0).getCanvasByIndex(3);
            canvas.getBehavior().should.equal(Behavior.FACING_PAGES);
        });

        it('canvas after spread has no behavior', function() {
            var canvas = facingPagesManifest.getSequenceByIndex(0).getCanvasByIndex(4);
            expect(canvas.getBehavior()).to.be.null;
        });
    });

    describe('auto-advance and no-auto-advance on A/V canvases', function() {

        it('loads successfully', function(done) {
            manifesto.loadManifest(manifests.canvasBehaviorAV).then(function(data) {
                avManifest = manifesto.parseManifest(data);
                done();
            });
        });

        it('first canvas has auto-advance behavior', function() {
            var canvas = avManifest.getSequenceByIndex(0).getCanvasByIndex(0);
            canvas.getBehavior().should.equal(Behavior.AUTO_ADVANCE);
        });

        it('second canvas has no-auto-advance behavior', function() {
            var canvas = avManifest.getSequenceByIndex(0).getCanvasByIndex(1);
            canvas.getBehavior().should.equal('no-auto-advance');
        });
    });

});